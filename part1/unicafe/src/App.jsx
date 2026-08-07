import { useState } from "react"

const Title = (props) => <h1>{props.name}</h1>

const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => <p>{props.text} {props.value}</p>

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
      <Button onClick={HandleGoodClick} text='good'/>
      <Button onClick={HandleNeutralClick} text='neutral'/>
      <Button onClick={HandleBadClick} text='bad'/>
      <Title name='statistics'/>
      <Statistics value={good} text='good'/>
      <Statistics value={neutral} text='neutral'/>
      <Statistics value={bad} text='bad'/>
    </>
  )
}

export default App
