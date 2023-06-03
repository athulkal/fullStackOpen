function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const Header = (props) => {
    return <h1>{props.course}</h1>;
  };

  const Content = (props) => {
    const Part = (props) => {
      return (
        <p>
          {props.part} {props.excercise}
        </p>
      );
    };
    return <Part part={props.part} excercise={props.excercise} />;
  };
  const Total = () => {
    return (
      <p>
        Number of exercises:
        {course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part={course.parts[0].name}
        excercise={course.parts[0].exercises}
      />
      <Content
        part={course.parts[1].name}
        excercise={course.parts[1].exercises}
      />
      <Content
        part={course.parts[2].name}
        excercise={course.parts[2].exercises}
      />
      <Total />
    </div>
  );
}

export default App;
