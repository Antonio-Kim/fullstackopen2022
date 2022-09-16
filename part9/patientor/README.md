# FullStack Open - Part 9: Typescript

## 9.8: Patientor backend, step 1

Initialise a new backend project that will work with the frontend. Configure eslint and tsconfig with the same configurations as proposed in the material. Define an endpoint that answers to HTTP GET requests to route _/api/ping_.

The project should be runnable with npm scripts, both in development mode and, as compiled code, in production mode.

## 9.9: Patientor backend, step 2

Fork and clone the project patientor. Start the project with the help of the README file.

You can run this command if you get error message when trying to start the frontend:

```bash
npm update chokidar
```

You should be able to use the frontend without a functioning backend.

Ensure that backend answers to the ping request that _frontend_ has made on startup. Check developer tool to make sure it really works

## 9.10: Patientor backend, step 3

Similarly to Ilari's flight service, we do not use a real database in our app but instead use hardcoded _data_ that is in the files diagnoses.json and patients.json. Get the files and store those in a directory called data in your project. All data modification can be done in runtime memory, so during this part it is _not necessary to write to a file_.

Create a type Diagnose and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

Note that diagnoses may or may not contain the field latin. You might want to use optional properties in the type definition.
