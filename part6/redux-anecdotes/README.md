# FullStack Open Part 6 - redux-anecdotes

## 6.3: anecdotes, step 1

Implement the functionality for voting anecdotes. The amount of votes must be saved to a Redux-store.

## 6.4: anecdotes, step 2

Implement the functionality for adding new anecdotes.

You can keep the form uncontrolled, like we did earlier.

## 6.5: anecdotes, step 3

Make sure that the anecdotes are ordered by the number of votes.

## 6.6: anecdotes, step 4

If you haven't done so already, separate the creation of action-objects to action creator-functions and place them in the src/reducers/anecdoteReducer.js file, so do like we have been doing since the chapter action creators.

## 6.7: anecdotes, step 5

Separate the creation of new anecdotes into its own component called AnecdoteForm. Move all logic for creating a new anecdote into this new component.

## 6.8: anecdotes, step 6

Separate the rendering of the anecdote list into its own component called AnecdoteList. Move all logic related to voting for an anecdote to this new component.

Now the App component should look like this:

```JS
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
```

## 6.9 Better anecdotes, step 7

Install Redux Toolkit for the project. Move the Redux store creation into its own file store.js and use Redux Toolkit's configureStore to create the store. Also, start using Redux DevTools to debug the application's state easier.

## 6.10 Better anecdotes, step 8

The application has a ready-made body for the Notification component:

```JS
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification
```

Extend the component so that it renders the message stored in the Redux store, making the component take the following form:

```JS
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(/* something here */)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
```

You will have to make changes to the application's existing reducer. Create a separate reducer for the new functionality by using the Redux Toolkit's createSlice function. Also, refactor the application so that it uses a combined reducer as shown in this part of the course material.

The application does not have to use the Notification component in an intelligent way at this point in the exercises. It is enough for the application to display the initial value set for the message in the notificationReducer.

## 6.11 Better anecdotes, step 9

Extend the application so that it uses the Notification component to display a message for five seconds when the user votes for an anecdote or creates a new anecdote

It's recommended to create separate action creators for setting and removing notifications.
