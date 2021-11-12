import React from 'react';
import './counter-value.css';

const CounterValue=({value})=>{
    return(
        <div className="value-container">
            <p className="value-para">Counter Value : <label>{value}</label></p>
        </div>
    )
}
export default CounterValue;