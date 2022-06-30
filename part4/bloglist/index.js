require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to MongoDB."));

app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path:   ", request.path);
  console.log("Body:   ", request.body);
  console.log("---");

  next();
};

app.use(requestLogger);

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" });
});

app.get("/api/blogs", (request, response, next) => {
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((error) => console.error(error));
});

app.post("/api/blogs", (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then(() => response.json(blog))
    .catch((error) => console.error(error));
});

const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ message: "unknown endpoint " });
  next(error);
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
