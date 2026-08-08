import { useState } from "react"

const Title = (props) => <h1>{props.name}</h1>

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  if(props.text === 'positive') {
    return (
      <tr>
        <td>{props.text} {props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text} {props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good * 1 - bad * -1) / total
  const positive = (good / total) * 100

  if(total === 0) {
    return <p>No feedback given</p>
  }

  return(
    <table>
      <StatisticLine text='good'value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={total} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={positive} />
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGoodClick = () => setGood(good + 1)
  const HandleNeutralClick = () => setNeutral(neutral + 1)
  const HandleBadClick = () => setBad(bad + 1)

  return (
    <>
      <Title name='give feedback'/>
      <Button onClick={HandleGoodClick} text='good' />
      <Button onClick={HandleNeutralClick} text='neutral' />
      <Button onClick={HandleBadClick} text='bad' />
      <Title name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
