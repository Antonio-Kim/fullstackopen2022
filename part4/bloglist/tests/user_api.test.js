const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const helper = require("../tests/test_helper");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      passwordHash,
    });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = (await User.find({})).map((u) => u.toJSON());

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = (await User.find({})).map((u) => u.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username is already taken", async () => {
    const usersAtStart = (await User.find({})).map((u) => u.toJSON());

    const newUser = {
      username: "root",
      name: "superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = (await User.find({})).map((u) => u.toJSON());
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("username must be given", async () => {
    const usersAtStart = (await User.find({})).map((u) => u.toJSON());

    const newUser = {
      password: "test",
    };

    const error = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(error.error.text).toContain("no username was given");
    const usersAtEnd = (await User.find({})).map((u) => u.toJSON());
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("password must be given", async () => {
    const usersAtStart = (await User.find({})).map((u) => u.toJSON());

    const newUser = {
      username: "test",
    };

    const error = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(error.error.text).toContain("no password was given");
    const usersAtEnd = (await User.find({})).map((u) => u.toJSON());
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("both username or password must contain at least three characters", async () => {
    const usersAtStart = (await User.find({})).map((u) => u.toJSON());

    const newUser = {
      username: "lol",
      password: "tt",
    };

    const error = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(error.error.text).toContain(
      "password or username requires at least three characters"
    );
    const usersAtEnd = (await User.find({})).map((u) => u.toJSON());
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

let response;

describe("testing blog posts", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({
      username: "root",
      passwordHash,
    });

    response = await user.save();

    const blogObjects = helper.blogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("retrieve all the blogs", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const getToken = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);
    const token = `bearer ${getToken.body.token}`;

    await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtStart).toHaveLength(blogsAtEnd.length);
  });

  test("login and create a post", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const getToken = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);

    const newPost = {
      title: "This is a test",
      author: "Me",
      url: "https://unknown.com/",
      likes: 0,
      user_id: response._id.toString(),
    };

    await api
      .post("/api/blogs")
      .auth(getToken.body.token, { type: "bearer" })
      .send(newPost)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    const title = blogsAtEnd.map((blog) => blog.title);
    expect(title).toContain(newPost.title);
  });

  test("unauthorized action when token is not provided", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const newPost = {
      title: "This is a test",
      author: "Me",
      url: "https://unknown.com/",
      likes: 0,
      user_id: response._id.toString(),
    };

    await api.post("/api/blogs").send(newPost).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
