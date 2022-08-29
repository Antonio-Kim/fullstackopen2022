# FullStack Open 2022 - Part 7: Extending the Bloglist

## 7.9: automatic code formatting

In the previous parts we used ESLint to ensure that code to follows the defined conventions. Prettier is yet another approach for the same. According to the documentation Prettier is an opinionated code formatter, that is, Prettier does not only control the code style but it also formats the code according to the definition.

Prettier is easy to integrate to the code editor, so that when the code is saved, it is automatically formatted correctly.

Take Prettier to use in your app and configure it to work with your editor.

## 7.10: redux, step 1

Refactor the application from using internal React component state to using Redux for the application's state management.

Change the application's notifications to use Redux at this point of the exercise set.

## 7.11: redux, step 2

Note that this and the next two exercises are quite laborious but incredibly educational.

Store the information about blog posts in the Redux store. In this exercise, it is enough that you can see the blogs in the backend and create a new blog.

You are free to manage the state for logging in and creating new blog posts by using the internal state of React components.
