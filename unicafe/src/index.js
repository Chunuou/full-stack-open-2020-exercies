import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistic = ({text, value}) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;
  let average = all / 3;
  let positive = all === 0 ? 0 : good / all * 100;

  if (all === 0) {
    return <p>No feed back given</p>
  }

  return (
    <>
      <h1>statisties</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={`${positive}%`} />
        </tbody>
      </table>
    </>
  )
} 

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  return (
    <>
      <h1>give feed back</h1>
      <Button text="good" handleClick={() => {setGood(good + 1)}} />
      <Button text="neutral" handleClick={() => {setNeutral(neutral + 1)}} />
      <Button text="bad" handleClick={() => {setBad(bad + 1)}} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));