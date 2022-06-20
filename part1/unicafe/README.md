# FullStackOpen Part 1 - Unicafe

## 1.6: unicafe step1
Like most companies, Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

Note that your application needs to work only during a single browser session. Once you refresh the page, the collected feedback is allowed to disappear.

It is advisable to use the same structure that is used in material and previous exercise. File index.js is as follows:
```JavaScript
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
You can use the code below as a starting point for the App.js file:

import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      code here
    </div>
  )
}

export default App
```

## 1.7: unicafe step2
Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

## 1.8: unicafe step3
Refactor your application so that displaying the statistics is extracted into its own Statistics component. The state of the application should remain in the App root component.

Remember that components should not be defined inside other components:
```JavaScript
// a proper place to define a component
const Statistics = (props) => {
  // ...
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // do not define a component within another component
  const Statistics = (props) => {
    // ...
  }

  return (
    // ...
  )
}
```

## 1.9: unicafe step 4
Change your application to display statistics only once feedback has been gathered.

## 1.10: unicafe step 5
Let's continue refactoring the application. Extract the following two components:

Button for defining the buttons used for submitting feedback
StatisticLine for displaying a single statistic, e.g. the average score.
To be clear: the StatisticLine component always displays a single statistic, meaning that the application uses multiple components for rendering all of the statistics:
```JavaScript
const Statistics = (props) => {
  /// ...
  return(
    <div>
      <StatisticLine text="good" value ={...} />
      <StatisticLine text="neutral" value ={...} />
      <StatisticLine text="bad" value ={...} />
      // ...
    </div>
  )
}
```
The application's state should still be kept in the root App component.

## 1.11*: unicafe step6
Display the statistics in an HTML table
Remember to keep your console open at all times. If you see this warning, then perform the necessary actions to make the warning disappear. Try pasting the error message into a search engine if you get stuck.
```
Typical source of an error Unchecked runtime.lastError: Could not establish connection. Receiving end does not exist.is Chrome extension. Try going to chrome://extensions/and try disabling them one by one and refreshing React app page; the error should eventually disappear.
```
Make sure that from now on you don't see any warnings in your console!