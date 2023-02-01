import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import blogReducer from './reducers/blog';
import messageReducer from './reducers/message';

const reducer = combineReducers({
  message: messageReducer,
  blogs: blogReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
