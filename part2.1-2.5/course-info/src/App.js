import Course from "./components/Course";

function App() {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          id: "1",
          name: "Fundamentals of React",
          exercises: 10,
        },
        {
          id: "2",
          name: "Using props to pass data",
          exercises: 7,
        },
        {
          id: "3",
          name: "State of a component",
          exercises: 14,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

export default App;
