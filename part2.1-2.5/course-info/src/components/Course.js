import React from "react";

//header component
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

//content component
const Content = ({ parts }) => {
  //Component parts
  const Part = (part) => {
    return (
      <p>
        {part.part.name} {part.part.exercises}
      </p>
    );
  };

  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

// component rendering total
const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises:
      {parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
