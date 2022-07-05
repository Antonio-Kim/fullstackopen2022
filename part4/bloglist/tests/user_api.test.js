const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");

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

afterAll(async () => {
  // await User.deleteMany({});
  mongoose.connection.close();
});
