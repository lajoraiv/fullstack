import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)




  return (
    <div>
      <Header text="give feedback" />
      <Button   
        handleClick={increaseGood}
        text='good'
        />
      <Button   
        handleClick={increaseNeutral}
        text='neutral'
        />
      <Button   
        handleClick={increaseBad}
        text='bad'
        />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div> 
       <h1>{props.text}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad > 0) return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value = {props.bad} />
          <StatisticLine text="all" value = {props.good + props.neutral + props.bad } />
          <StatisticLine text="average" value = {(props.good - props.bad)/2}/>
          <StatisticLine text="positive" value = {(props.good / (props.good + props.neutral + props.bad))*100 + "%"}/>
        </tbody>
      </table>
    </div>
  )
  return (
    <div> 
      No feedback given
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
    </>
  )
}

export default App