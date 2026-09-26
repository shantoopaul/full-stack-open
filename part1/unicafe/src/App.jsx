import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <td align="left">{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ reviews: [good, neutral, bad] }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = `${(good / all) * 100} %`;

  if (all === 0) return <p>No feedback given</p>;

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodReview = () => setGood(good + 1);
  const handleNeutralReview = () => setNeutral(neutral + 1);
  const handleBadReview = () => setBad(bad + 1);

  return (
    <div>
      <Header title="Give Feedback" />
      <Button onClick={handleGoodReview} text="Good" />
      <Button onClick={handleNeutralReview} text="Neutral" />
      <Button onClick={handleBadReview} text="Bad" />
      <Header title="Statistics" />
      <Statistics reviews={[good, neutral, bad]} />
    </div>
  );
};

export default App;
