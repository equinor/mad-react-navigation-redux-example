import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const defaultState = {
  count: 0,
};


export default handleActions({
  [actions.incrementCounter]: (state, action) => ({
    ...state,
    count: state.count + 1,
  }),
}, defaultState);


const reducerKey = 'counter'; // NOTE: This should equal the key in ./index.js

export const getCount = state => state[reducerKey].count;
