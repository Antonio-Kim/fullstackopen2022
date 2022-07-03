const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("GET methods", () => {
  test("correct amount of blog posts are returned", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(helper.blogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const currentBlogs = response.body;
    currentBlogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("POST methods", () => {
  test("able to add new blog post", async () => {
    const newBlog = {
      title: "Another one bites the dust",
      author: "Queens",
      url: "none",
      likes: 100,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await Blog.find({});
    expect(response).toHaveLength(helper.blogs.length + 1);
    const lastBlog = response[response.length - 1];
    expect(lastBlog).toMatchObject(newBlog);
  });

  test("likes are missing from request", async () => {
    const newBlog = {
      title: "Another one bites the dust",
      author: "Queens",
      url: "none",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await Blog.find({});
    expect(response).toHaveLength(helper.blogs.length + 1);
    const lastBlog = response[response.length - 1];
    expect(lastBlog).toHaveProperty("likes", 0);
  });

  test("mising title and url will return 400 status code", async () => {
    const newBlog = {
      author: "Queens",
      likes: 100,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("DELETE methods", () => {
  test.only("delete a single blog post resource", async () => {
    const postsAtStart = await Blog.find({});
    const blogToDelete = postsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete._id}`).expect(204);

    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(helper.blogs.length - 1);

    const content = blogsAtEnd.map((r) => r.title);
    expect(content).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
