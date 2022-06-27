const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");
const { response } = require("express");
app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("data", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/info", (request, response, next) => {
  Person.countDocuments({}, (err, count) => {
    if (err) next(err);
    else {
      response.send(
        `<p>Phonebook has info for ${count} people</p>
         <p>${Date()}</p>
        `
      );
    }
  });
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

app.post("/api/persons/", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: `name or number is missing`,
    });
  }

  Person.findOneAndUpdate(
    { name: body.name },
    { number: body.number },
    { new: true, upsert: true }
  ).then((savedPerson) => response.json(savedPerson));
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

const UnknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(UnknownEndpoint);

const ErrorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "CastError")
    return response.status(400).send({ error: "malformatted id" });

  next(error);
};

app.use(ErrorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
