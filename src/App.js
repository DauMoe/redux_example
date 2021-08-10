import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

function App() {
    //Video: https://www.youtube.com/watch?v=hc3CSmw3L6I
    const dispatch = useDispatch();
    const count = useSelector(state => state.counter);

    return(
        <div>
            <div>
                <h1>Count: {count}</h1>
            </div>
            <button onClick={() => {
                dispatch({type: "INCREMENT"});
            }}>Add</button>
            <button onClick={() => {
                dispatch({type: "DECREMENT"})
            }}>Minus</button>
        </div>
    );
}

export default App;
