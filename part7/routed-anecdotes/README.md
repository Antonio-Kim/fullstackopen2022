# FullStack Open Part 7 - router-anecdotes

## 7.1: routed anecdotes, step 1

Add React Router to the application so that by clicking links in the Menu component the view can be changed.
At the root of the application, meaning the path /, show the list of anecdotes. The Footer component should always be visible at the bottom. The creation of a new anecdote should happen e.g. in the path "create"

## 7.2: routed anecdotes, step 2

Implement a view for showing a single anecdote. Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

## 7.3: routed anecdotes, step 3

The default functionality of the creation form is quite confusing, because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds

## 7.4: anecdotes and hooks step1

Simplify the anecdote creation form of your application with the useField custom hook we defined earlier.

One natural place to save the custom hooks of your application is in the /src/hooks/index.js file.

If you use the named export instead of the default export:

```JS
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}
```

Then importing happens in the following way:

```JS
import  { useField } from './hooks'

const App = () => {
  // ...
  const username = useField('text')
  // ...
}
```
