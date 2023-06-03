import React, { useState } from "react";

const Button = ({ handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = (props) => {
  return (
    <>
      <StatisticLine text={"Good: "} value={props.good} />
      <StatisticLine text={"Neutral:"} value={props.neutral} />
      <StatisticLine text="Bad:" value={props.bad} />
      <StatisticLine text="all:" value={props.total} />
      <StatisticLine
        text=" Average:"
        value={props.total ? (props.good - props.bad) / props.total : 0}
      />
      <StatisticLine
        text="positive:"
        value={
          props.total ? ((props.good / props.total) * 100).toString() + "%" : 0
        }
      />
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const incrementGood = () => {
    let saveGood = good + 1;
    setGood(saveGood);
    setTotal(saveGood + neutral + bad);
  };
  const incrementNeutral = () => {
    let saveNeutral = neutral + 1;
    setNeutral(saveNeutral);
    setTotal(good + saveNeutral + bad);
  };
  const incrementBad = () => {
    let saveBad = bad + 1;
    setBad(saveBad);
    setTotal(good + neutral + saveBad);
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={incrementGood}>Good</Button>
      <Button handleClick={incrementNeutral}>Neutral</Button>
      <Button handleClick={incrementBad}>Bad</Button>
      <h2>Statistics</h2>
      {total ? (
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
}

export default App;
