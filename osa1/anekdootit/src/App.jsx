import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  
  const points = [0, 0, 0, 0, 0, 0, 0, 0]
  const [list, setList] = useState(points)
  
  const setRandom = () => {
    var randomNumber = (Math.floor(Math.random() * 8))
    setSelected(randomNumber)
    console.log(randomNumber)
  }

  const voteAnecdote = () => {
    const copy = [...list]
    copy[selected] += 1
    setList(copy)
    console.log(copy)
    console.log(list)
  }

  return (
    <div>
      <Header text = "Anecdote of the day"/>
      {anecdotes[selected]}<br></br>
      <Votes votes = {list[selected]} number = {selected}/>
      <Button   
        handleClick={setRandom}
        text='next anecdote'
        />
      <Button   
        handleClick={voteAnecdote}
        text='vote'
        />
        <Header text = "Anecdote with the most votes"/>
        <MostVotes votearray = {list} anecdotearray = {anecdotes}/>
    </div>
  )
}

const Votes = (props) => {
  console.log(props.votes)
  console.log(props.number)
  return (
    <div> 
       has {props.votes} votes
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <div> 
       <h1>{props.text}</h1>
    </div>
  )
}

const MostVotes = (props) => {
  var index = 0
  var votes = 0
  for (let i = 0; i < props.votearray.length; i++) {
    if (props.votearray[i] > votes) {
      votes =props.votearray[i]
      index = i
    }
  }
  return (
    <div> 
       {props.anecdotearray[index]}<br></br>
       has {votes} votes
    </div>
  )
}
export default App