# Fullstack Open - Part 11: CI/CD

## 11.1 Warming up

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

The points to discuss:

- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.
- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Remember that there are no 'right' answers to the above!

## 11.2 The example project

The first thing you'll want to do is to fork the example repository under your name. What it essentially does is it creates a copy of the repository under your GitHub user profile for your use.

To fork the repository, you can click on the Fork button in the top-right area of the repository view next to the Star button:

Once you've clicked on the Fork button, GitHub will start the creation of a new repository called {github_username}/full-stack-open-pokedex.

Once the process has been finished, you should be redirected to your brand new repository:

Clone the project now to your machine. As always, when starting with a new code, the most obvious place to look first is the file package.json

Try now the following:

- install dependencies (by running npm install)
- start the code in development mode
- run tests
- lint the code

You might notice that project contains some broken tests and linting errors. **Just leave them as they are for now**. We will get around those later in the exercises.

As you might remember from part 3, the React code should not be run in development mode once it is deployed in production. Try now the following

- create a production _build_ of the project
- run the production version locally

Also for these two tasks, there are ready-made npm scripts in the project!

Study the structure of the project for a while. As you notice both the frontend and the backend code is now in the same repository. In earlier parts of the course we had a separate repository for both, but having those in the same repository makes things much simpler when setting up a CI environment.

In contrast to most projects in this course, the frontend code _does not use_ create-react-app, but it has a relatively simple webpack configuration that takes care of creating the development environment and creating the production bundle.

## 11.3 Hello world!

Create a new Workflow which outputs "Hello World!" to the user. For the setup, you should create the directory .github/workflowsand a file hello.ymlto your repository.

To see what your GitHub Action workflow has done, you can navigate to the Actions tab in GitHub where you should see the workflows in your repository and the steps they implement. The output of your Hello World workflow should have:

- hello_world_job as a title
- Set up job
- Say Hello
- Complete job

You should see the "Hello World!" message as an output. If that's the case then you have successfully gone through all the necessary steps. You have your first GitHub Actions workflow active!

Note that GitHub Actions also gives you information what is the exact environment (operating system, and it's setup) where your workflow is run. This is important since if something surprising happens, it makes debugging so much easier if you can reproduce all the steps in your machine!

## 11.4 Date and directory contents

Extend the workflow with steps that print the date and current directory content in long format.

Both of these are easy steps, and just running commands date and ls will do the trick.

As the output of command ls -l shows, by default, the virtual environment that runs our workflow does not have any code!

## 11.5 Linting workflow

Implement or copy-paste the "Lint" workflow and commit it to the repository. Use a new yml file for this workflow, you may call it e.g. pipeline.yml.

Push your code and navigate to "Actions" tab and click on your newly created workflow on the left. You should see that the workflow run has failed:

## 11.6 Fix the code

There are some issues with the code that you will need to fix. Open up the workflow logs and investigate what is wrong.

A couple of hints. One of the errors is best to be fixed by specifying proper env for linting, see here how it can be done . One of the complaints concerning console.logstatement could be taken care of by simply silencing the rule for that specific line. Ask google how to do it.

Make the necessary changes to the source code so that the lint workflow passes. Once you commit new code the workflow will run again and you will see updated output where all is green again:

## 11.7 Building and testing

Let's expand on the previous workflow that currently does the linting of the code. Edit the workflow and similarly to the lint command add commands for build and test. As you might have guessed, there are some problems in code...

## 11.8 Back to green

Investigate which test fails and fix the issue in the code (do not change the tests).

Once you have fixed all the issues and the Pokedex is bug-free, the workflow run will succeed and show green!

## 11.9 Simple end to end -tests

The current set of tests use Jest to ensure that the React components work as intended. This is exactly the same thing that is done in section Testing React apps of part 5.

Testing components in isolation is quite useful but that still does not ensure that the system as a whole works as we wish. To have more confidence about this, let us write a couple of really simple end to end -tests with the Cypress library similarly what we do in section End to end testing of part 5.

So, setup Cypress (you'll find here all info you need) and use this test at first:

```JS
describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5000')
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
})
```

Define a npm script test:e2efor running the e2e tests from the command line.

**Note** do not include the word spec in the Cypress test file name, that would cause also Jest to run it, and it might cause problems.

**Note2** end to end tests are pretty slow and than can cause problems when run with the GitHub Actions. Slowness can be remedied by changing App.jsx to fetch a bit less Pokemons, eg. 50 works fine:

```JS
const {
  data: pokemonList, error, isLoading
} = useApi('https://pokeapi.co/api/v2/pokemon/?limit=50', mapResults)
```

The same change must be done in the test file _App.jest.spec.jsx_

The change is now (16th September 2022) done in the repository, but if you have fetched the code earlier, there might still be a bigger number.

**Another thing to note** is that despite the page renders the Pokemon names by starting with a capital letter, the names are actually written with lower case letters in the source, so it is ivysaurinstead of Ivysaur!

Ensure that the test passes locally. Remember that the Cypress tests assume that the application is up and running when you run the test! If you have forgotten the details (that happened to me too!), please see part 5 how to get up and running with Cypress.

Once the end to end test works in your machine, include it in the GitHub Action workflow. By far the easiest way to do that is to use the ready-made action cypress-io/github-action. The step that suits us is the following:

```YAML
- name: e2e tests
  uses: cypress-io/github-action@v2
  with:
    command: npm run test:e2e
    start: npm run start-prod
    wait-on: http://localhost:5000
```

Three options are used. command specifies how to run Cypress tests. start gives npm script that starts the server and wait-on says that before the tests are run, the server should have started in url http://localhost:5000.

If you are using Cypress 10.X, you may need to revise the steps as follows:

```yaml
- name: e2e tests
  uses: cypress-io/github-action@v4
  with:
    build: npm run build
    start: npm run start-prod
    wait-on: http://localhost:5000
```

Once you are sure that the pipeline works, write another test that ensures that one can navigate from the main page to the page of a particular Pokemon, e.g. ivysaur. The test does not need to be a complex one, just check that when you navigate a link, the page has some right content, such as the string chlorophyll in the case of ivysaur.

**Note** also the Pokemon abilities are written with lower case letters, the capitalization is done in CSS, so do not search eg. for Chlorophyll but chlorophyll.

**Note2** that you should not try bulbasaur, for some reason the page of that particular Pokemon does not work properly...

End to end -tests are nice since they give us confidence that software works from the end user's perspective. The price we have to pay is the slower feedback time. Now executing the whole workflow takes quite much longer.
