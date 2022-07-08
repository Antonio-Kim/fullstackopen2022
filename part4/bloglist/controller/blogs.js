const blogRouter = require("express").Router();
const Blog = require("../models/blog");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
const userExtractor = require("../utils/middleware").userExtractor;

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.status(200).json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", userExtractor, async (request, response, next) => {
  const body = request.body;
  const user = request.user;

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
  });

  try {
    const savedPost = await blogPost.save();
    user.blogs = user.blogs.concat(savedPost._id);
    await user.save();
    response.status(201).json(savedPost);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  // console.log(blog.user._id.toString() === user.id.toString());
  if (blog.user._id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "invalid action" });
  }

  try {
    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    );
    await user.save();
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = await request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      upsert: true,
    });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
