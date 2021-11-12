import React from 'react';
import './counter.css';
import { useState } from 'react';
import CounterValue from '../counter-value';
import CounterInput from '../counter-input';
import Axios from 'axios';

const Counter = ({minValue=0,maxValue=10,userName='arpita'}) => {
  const [count,setCount] =useState({value:minValue,loading:null,error:null});

  const updateCounter= async (value)=>{
    try {
      setCount({...count,loading:true});
      const result = await Axios.put('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', {[userName]:value});
      if(result.data){
        setCount({value:maxValue<=result.data[userName]?maxValue:result.data[userName],loading:false,error:null});
      }
      else{
        setCount({value:'',loading:false,error:null});
      }
    } catch (err) {
      setCount((count)=> ({value:count.value,loading:false,error:err}));
    }
  }
  const incrementCounter = async ()=>{
    updateCounter(count.value+1);
  }
  const decrementCounter = async ()=>{
    updateCounter(count.value-1);
  }

  const textValueChanged = (e)=>{
    const value= e.target.value;
    if(value == ""){
      updateCounter(null);
    }
    updateCounter(parseInt(value));
  }
  return (
    <div className="counter-container">
      <CounterInput 
        count={count.value} 
        loading={count.loading}
        error={count.error}
        incrementCounter={incrementCounter} 
        decrementCounter={decrementCounter}
        textValueChanged={textValueChanged}
      />
      <CounterValue value={count.value}/>
    </div>
  )
}
export default Counter;