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
