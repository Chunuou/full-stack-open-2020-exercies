import { connect } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ createNew, setNotification }) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    createNew(content);

    setNotification(`${content} has been create`, 5);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createNew,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
