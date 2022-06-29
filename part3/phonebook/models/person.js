const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLenght: 8,
    required: true,
    validate: {
      validator: ( number ) => {
        return /\d{2,3}-\d{7,8}/.test(number);
      },
      message: "the phone number is not a valid phone number!"
    }
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
