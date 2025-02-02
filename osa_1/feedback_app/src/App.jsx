import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  console.log("Current state - good:", good, "neutral:", neutral, "bad:", bad);
  
  const total = good + neutral + bad
  console.log("Total feedbacks:", total);
  
  const average = total ? (good - bad) / total : 0
  console.log("Average score:", average);
  
  const positive = total ? (good / total) * 100 : 0
  console.log("Positive feedback percentage:", positive);

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Statistic</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average.toFixed(1)} />
        <StatisticLine text="Positive" value={positive.toFixed(1) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log("State - good:", good, "neutral:", neutral, "bad:", bad);

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => {
        console.log("Good button clicked");
        setGood(good + 1);
      }} text="Good" />
      <Button handleClick={() => {
        console.log("Neutral button clicked");
        setNeutral(neutral + 1);
      }} text="Neutral" />
      <Button handleClick={() => {
        console.log("Bad button clicked");
        setBad(bad + 1);
      }} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
