const Course = (props) => {
    console.log('props value is', props)
    return (
      <div> 
        <Header name = {props.course.name}></Header>
        <Content course = {props.course}></Content>
        <Total course = {props.course}></Total>
      </div>
    )
  }
  const Header = (props) => {
    console.log('props are', props);
    return (
      <div> 
         <h1>{props.name}</h1>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log('props value is', props)
    return (
      <div> 
         {props.course.parts.map(parts => 
          <p key={parts.id}>{parts.name} {parts.exercises}</p>)}
      </div>
    )
  }
  
  const Total = (props) => {
    console.log('props are', props);
    const total = props.course.parts.reduce((accumulator ,parts) => {
      return accumulator += parts.exercises;
    }, 0)
    return (
      <div> 
         <b>total of {total} exercises</b>
      </div>
    )
  }

  export default Course;