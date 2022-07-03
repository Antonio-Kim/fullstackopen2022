const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.status(200).json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post("/", (request, response, next) => {
  const body = request.body;

  const blogPost = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blogPost
    .save()
    .then((savedPost) => response.json(savedPost))
    .catch((error) => next(error));
});

module.exports = blogRouter;
