import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(points);

  const selectAnecdote = () => {
    const randomNumber = Math.trunc(Math.random() * 8);
    setSelected(randomNumber);
  };
  ///
  const IncrementVote = () => {
    const copy = { ...vote };
    copy[selected] += 1;
    setVote({ ...copy });
  };

  let highestVal = 0;
  let keyPair = "";

  for (const [key, value] of Object.entries(vote)) {
    if (Number(value) > highestVal) {
      highestVal = Number(value);
      keyPair = key;
    }
    console.log(highestVal);
  }
  console.log(keyPair, highestVal);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick={IncrementVote} text="vote"></Button>
      <Button handleClick={selectAnecdote} text="next anecdote"></Button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[keyPair]}</p>
      <p>has {vote[keyPair]} votes</p>
    </div>
  );
}

export default App;

/*



 */
