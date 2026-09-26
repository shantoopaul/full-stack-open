import { useState } from "react";

const Header = ({ heading }) => <h2>{heading}</h2>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const AnecdoteWVotes = ({ index, anecdotes, votes }) => {
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>- has {votes[index]} vote/s</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const top = Math.max(...votes);
  const topAnecdoteIdx = votes.indexOf(top);

  const handleRandomAnecdote = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };

  const handleVote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <div>
        <Header heading="Anecdote of the day" />
        <AnecdoteWVotes index={selected} anecdotes={anecdotes} votes={votes} />
        <Button onClick={() => handleVote(selected)} text="Vote" />
        <Button onClick={handleRandomAnecdote} text="Next Anecdote" />
      </div>
      <div>
        <Header heading="Anecdote with most votes" />
        <AnecdoteWVotes index={topAnecdoteIdx} anecdotes={anecdotes} votes={votes} />
      </div>
    </>
  );
};

export default App;
