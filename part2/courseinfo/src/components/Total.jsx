const Total = ({ parts }) => {
  const total = parts.reduce((a, c) => a + c.exercises, 0);

  return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
  );
};

export default Total;
