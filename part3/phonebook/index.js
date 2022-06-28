require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");
const { response } = require("express");
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get(`/api/persons`, (request, response, next) => {
  Person.find({}).then((result) => {
    response.json(result);
  })
  .catch(error => next(error));
});

app.post(`/api/persons`, (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findOneAndUpdate({ name: body.name }, person, {
    new: true,
    upsert: true,
    runValidators: true,
  }).then((savedPerson) => res.json(savedPerson))
  .catch(err => next(err));
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({}).then((result) => {
    res.send(`
    <p>Phonebook has info for ${result} people </p>
    <p>${new Date()}</p>
    `);
  });
});

const UnknownEndpoint = (req, res) => {
  res.status(404).json({ error: `unknown endpoint ` });
};

app.use(UnknownEndpoint);

const ErrorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === `CastError`) {
    return res.status(404).json({ error: error.message });
  } else if (error.name === `ValidationError`) {
    return res.status(404).json({ error: error.message});
  }
};

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`listening to port ${process.env.PORT}`);
});
