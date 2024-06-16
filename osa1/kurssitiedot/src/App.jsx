const App = () => {
<<<<<<< HEAD
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content parts = {parts}/>
      <Total parts = {parts} />
=======
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
>>>>>>> osa1
    </div>
  )
}

const Header = (props) => {
<<<<<<< HEAD
  console.log(props)
  return (
    <div> 
       <h1>{props.course}</h1>
=======
  return (
    <div> 
       <h1>{props.course.name}</h1>
>>>>>>> osa1
    </div>
  )
}

const Content = (props) => {
<<<<<<< HEAD
  console.log(props)
  return (
    <div> 
       <p>{props.parts[0].name} {props.parts[0].exercises}</p>
       <p>{props.parts[1].name} {props.parts[1].exercises}</p>
       <p>{props.parts[2].name} {props.parts[2].exercises}</p>    
=======
  return (
    <div> 
       <p>{props.course.parts[0].name} {props.course.parts[0].exercises}</p>
       <p>{props.course.parts[1].name} {props.course.parts[1].exercises}</p>
       <p>{props.course.parts[2].name} {props.course.parts[2].exercises}</p>
>>>>>>> osa1
    </div>
  )
}

const Total = (props) => {
<<<<<<< HEAD
  console.log(props)
  return (
    <div> 
       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
=======
  return (
    <div> 
       <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
>>>>>>> osa1
    </div>
  )
}


export default App