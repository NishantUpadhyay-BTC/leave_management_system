import {createStore, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import reduxStore from '../reducers';

export default function configureStore(initialState){
  return  createStore(
    reduxStore,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
}
