# Fullstack Open 2022 - Part 9: TypeScript

## setup

Exercises 9.1.-9.7. will all be made in the same node project. Create the project in an empty directory with npm init and install the ts-node and typescript packages. Also create the file tsconfig.json in the directory with the following content:

```JSON
{
  "compilerOptions": {
    "noImplicitAny": true,
  }
}
```

The compiler option noImplicitAny, that makes it mandatory to have types for all variables used, is actually currently a default, but let us still define it explicitly.

## 9.1 Body mass index

Create the code of this exercise in file bmiCalculator.ts.

Write a function calculateBmi that calculates a BMI based on a given height (in centimeters) and weight (in kilograms) and then returns a message that suits the results.

Call the function in the same file with hard-coded parameters and print out the result. The code

```
console.log(calculateBmi(180, 74))
```

should print the following message:

```
Normal (healthy weight)
```

Create a npm script for running the program with command npm run calculateBmi.

## 9.2 Exercise calculator

Create the code of this exercise in file _exerciseCalculator.ts_.

Write a function _calculateExercises_ that calculates the average time of _daily exercise hours_ and compares it to the _target amount_ of daily hours and returns an object that includes the following values:

- the number of days
- the number of training days
- the original target value
- the calculated average time
- boolean value describing if the target was reached
- a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
- a text value explaining the rating

The daily exercise hours are given to the function as an array that contains the number of exercise hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:

```
[3, 0, 2, 4.5, 0, 3, 1]
```

For the Result object, you should create an interface.

If you call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2, it should return:

```JS
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
```

Create a npm script, _npm run calculateExercises_, to call the function with hard-coded values.

## 9.3 Command line

Change the previous exercises so that you can give the parameters of _bmiCalculator_ and _exerciseCalculator_ as command-line arguments.

Your program could work eg. as follows:

```Bash
$ npm run calculateBmi 180 91

Overweight
```

and:

```Bash
$ npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4

{ periodLength: 9,
  trainingDays: 6,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.7222222222222223 }
```

In the example, the _first argument_ is the target value.

Handle exceptions and errors appropriately. The exerciseCalculator should accept inputs of varied lengths. Determine by yourself how you manage to collect all needed input.

## 9.4 Express

Add Express to your dependencies and create an HTTP GET endpoint hello that answers 'Hello Full Stack!'

The web app should be started with commands npm start in production mode and npm run dev in development mode. The latter should also use ts-node-dev to run the app.

Replace also your existing tsconfig.json file with the following content:

```JSON
{
  "compilerOptions": {
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "esModuleInterop": true,
    "declaration": true,
  }
}
```

Make sure there aren't any errors!

## 9.5 WebBMI

Add an endpoint for the BMI calculator that can be used by doing an HTTP GET request to endpoint _bmi_ and specifying the input with query string parameters. For example, to get the BMI of a person having height 180 and weight 72, the url is http://localhost:3002/bmi?height=180&weight=72.

The response is a json of the form:

```JSON
{
  weight: 72,
  height: 180,
  bmi: "Normal (healthy weight)"
}
```

See the Express documentation for info on how to access the query parameters.

If the query parameters of the request are of the wrong type or missing, a response with proper status code and error message is given:

```JSON
{
  error: "malformatted parameters"
}
```

Do not copy the calculator code to file _index.ts_; instead, make it a TypeScript module that can be imported in index.ts.

## 9.6 Eslint

Configure your project to use the above eslint settings and fix all the warnings.

## 9.7 WebExercises

Add an endpoint to your app for the _exercise_ calculator. It should be used by doing an HTTP POST request to endpoint exercises with the input in the request body:

```json
{
  "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
  "target": 2.5
}
```

The response is a json of the following form:

```json
{
  "periodLength": 7,
  "trainingDays": 4,
  "success": false,
  "rating": 1,
  "ratingDescription": "bad",
  "target": 2.5,
  "average": 1.2142857142857142
}
```

If the body of the request is not of the right form, a response with proper status code and error message is given. The error message is either

```json
{
  "error": "parameters missing"
}
```

or

```json
{
  "error": "malformatted parameters"
}
```

depending on the error. The latter happens if the input values do not have the right type, i.e. they are not numbers or convertible to numbers.

In this exercise, you might find it beneficial to use the _explicit any_ type when handling the data in the request body. Our eslint configuration is preventing this but you may unset this rule for a particular line by inserting the following comment as the previous line:

```
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

You might also get in trouble with rules _no-unsafe-member-access_ and _no-unsafe-assignment_. These rules may be ignored in this exercise.

Note that you need to have a correct setup in order to get hold of the request body; see part 3.