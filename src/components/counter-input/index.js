import React from 'react';
import './counter-input.css';
import Loader from '../../img/loader.svg';

const CounterInput=({count,loading,error,incrementCounter,decrementCounter,textValueChanged,})=>{
    return(
        <div className="save-counter">
            {
            loading && <p className="loading"><img src={Loader}/>Saving counter value</p>}
            <button className="decrement" onClick={decrementCounter}>-</button>
            <input type="text" onChange={textValueChanged} value={count} className="text-value"/>
            <button className="increment" onClick={incrementCounter}>+</button>
            {error && <span>error saving counter -{error}</span>}
        </div>
    )
}
export default CounterInput;