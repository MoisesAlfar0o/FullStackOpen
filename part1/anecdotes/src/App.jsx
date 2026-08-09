import { useState } from "react"

const Title = ({ name }) => <h1>{name}</h1>

const Button = ({ onClick, text }) => {
  return(
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdotes = ({ anecdote, vote }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {vote || 0} votes</p>
    </div>
  )
}

const MostVoted = ({ votes, anecdotes }) => {
  if(votes.length === 0) {
    return (
      <p>No votes yet</p>
    )
  }

  const value = Math.max(...votes)
  const index = votes.indexOf(value)
  const MostVoted = anecdotes[index]

  return (
    <div>
      <p>{MostVoted}</p>
      <p>has {value} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(1)

  const handleNextAnecdote = () => {
    let randomAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomAnecdote)
  }

  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Title name='Anecdote of the day'/>
      <Anecdotes anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={handleVotes} text='vote'/>
      <Button onClick={handleNextAnecdote} text='Next anecdote'/>
      <Title name='Anecdote with the most votes'/>      
      <MostVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
