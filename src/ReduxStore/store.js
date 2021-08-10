import {createStore, combineReducers} from 'redux';
import {counterReducers} from "./reducers";

const rootReducers = combineReducers({counter: counterReducers});

export default createStore(rootReducers);
