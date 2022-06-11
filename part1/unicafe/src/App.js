import React, { useState } from 'react';

const Header = ({ title }) => <h1>{title}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Statistic = ({ type, name }) => <div>{name} {type}</div>

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const handleGoodClick = () => setGood(good+1);
  const handleNeutralClick = () => setNeutral(neutral+1);
  const handleBadClick = () => setBad(bad+1);

  return (
    <div>
      <Header title='give feedback' />
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header title='statistics' />
      <Statistic name='good' type={good} />
      <Statistic name='neutral' type={neutral} />
      <Statistic name='bad' type={bad} />
    </div>
  );
};

export default App;