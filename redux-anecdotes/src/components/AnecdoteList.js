import { connect } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ anecdotes, voteFor, setNotification }) => {
  const vote = (id) => {
    voteFor(id);
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);

    setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  const newAnecdotes = [...state.anecdotes];

  return {
    anecdotes: newAnecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes),
  };
};

const mapDispatchToProps = {
  voteFor,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
