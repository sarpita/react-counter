import './App.css';
import React from 'react';
import Counter from './components/counter';
import {useFetch} from './hooks';

function App() {
  const {getCountLoading, getCountResponse, getCountError} = useFetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json');
  const MAXVALUE=10;
  return (
    <div className="App">    
        <Counter
        minValue={getCountResponse} 
        maxValue={MAXVALUE}/>
    </div>
  );
}

export default App;
