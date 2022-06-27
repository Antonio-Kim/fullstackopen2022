require("dotenv").config();

const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url);
const person = new Person({
  name: process.argv[2],
  number: process.argv[3],
});

if (process.argv.length === 2) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((result) => {
    console.log(`added ${result.name} phone ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
