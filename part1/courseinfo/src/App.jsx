const Header = ({ course }) => <h1>{course}</h1>;

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
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total parts={[part1, part2, part3]} />
    </div>
  );
};

export default App;
