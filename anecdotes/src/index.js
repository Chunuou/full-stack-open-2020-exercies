import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(6).fill(0));
  const [highest, setHighset] = useState(0); 

  function nextAnecdote() {
    let random = Math.floor(Math.random() * 10);
    while (random > 5) {
      random = Math.floor(Math.random() * 10);
    }
    setSelected(random);
  }

  function vote() {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    refreshHigheset(newVotes);
  }

  function refreshHigheset(newVotes) {
    newVotes.forEach(vote => {
      if (vote > newVotes[highest]) {
        setHighset(selected);
      }
    })
  }

  return (
    <>
      <p>
        {anecdotes[selected]}
      </p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <h3>anecdote with most votes</h3>
      <p>
        {anecdotes[highest]}
      </p>
      <p>has {votes[highest]} votes</p>
    </>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);
