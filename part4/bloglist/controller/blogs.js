const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((error) => next(error));
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
