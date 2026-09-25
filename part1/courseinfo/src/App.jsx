const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => (
  <p>Number of exercises {parts.reduce((a, c) => a + c.exercises, 0)}</p>
);

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts: [part1, part2, part3] }) => {
  return (
    <div>
      <Part {...part1} />
      <Part {...part2} />
      <Part {...part3} />
    </div>
  );
};

const App = () => {
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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
