import anecdoteServise from '../service/anecdote';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'VOTE':
      return state.map((anecdote) => (anecdote.id === action.data.id ? action.data : anecdote));
    case 'CREATE':
      return state.concat(action.data);
    default:
      return state;
  }
};

export const init = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServise.getAll();
    dispatch({
      type: 'INIT',
      data: anecdotes,
    });
  };
};

export const voteFor = (id) => {
  return async (dispacth, getState) => {
    const { anecdotes } = getState();
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    const newAnecdote = await anecdoteServise.update({ ...anecdote, votes: anecdote.votes + 1 });
    dispacth({
      type: 'VOTE',
      data: newAnecdote,
    });
  };
};

export const createNew = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteServise.create(content);
    dispatch({
      type: 'CREATE',
      data: anecdote,
    });
  };
};

export default reducer;
