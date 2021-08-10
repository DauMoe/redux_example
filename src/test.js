import {useDispatch, useSelector} from "react-redux";
import {combineReducers} from "redux";
import React from "react";

export default () => {
    //Doc: https://thoughtbot.com/blog/using-redux-with-react-hooks

    const dispatch = useDispatch();

    //Reducers.js
    const initState = [];
    const REDUCER = function (init = initState, action) {
        const {type, payload} = action;
        switch(type) {
            case "INCREMENT":
                return [...init, payload];
            case "DECREMENT":
                return [...init, payload];
            default:
                return init;
        }
    };

    //Root reducers
    const rootReducer = combineReducers({REDUCER});

    //To prevent re-render both count or user whenever changed, useSelector for each var
    const count = useSelector(state => state.counter.count);
    const user = useSelector(state => state.user);

    //OR YOU CAN USE 'shallowEqual' TO COMPARE
    /*
      const { count, user } = useSelector(state => ({
        count: state.counter.count,
        user: state.user,
      }), shallowEqual);
    */

    function addCount(count) {

    }

    return (
        <div>
            <div>
                <h1>Count: {count}</h1>
            </div>
            <button onClick={() => dispatch(addCount(count))}>Add</button>
            <button>Minus</button>
        </div>
    );
}