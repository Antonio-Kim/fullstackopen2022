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

## 7.12: redux, step 3

Expand your solution so that it is again possible to like and delete a blog.

## 7.13: redux, step 4

Store the information about the signed-in user in the Redux store.

## 7.14: Users view

Implement a view to the application that displays all of the basic information related to users

## 7.15: Individual user view
Implement a view for individual users that displays all of the blog posts added by that user. You can access the view by clicking the name of the user in the view that lists all users

NB: you will almost certainly stumble across the following error message during this exercise:

```
TypeError: Cannot read property name or undefined
```

The error message will occur if you refresh the page for an individual user.

The cause of the issue is that, when we navigate directly to the page of an individual user, the React application has not yet received the data from the backend. One solution for fixing the problem is to use conditional rendering:

```JS
const User = () => {
  const user = ...
  if (!user) {
    return null
  }

  return (
    <div>
      // ...
    </div>
  )
}
```
