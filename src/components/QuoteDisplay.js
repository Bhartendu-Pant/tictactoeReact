import React, { useEffect, useState } from 'react'
import '../styles/QuoteDisplay.css'
const QuoteDisplay = () => {
    const [quote,setQuote]=useState('');
    const [error,setError]=useState(null);
    const [serialNumber,setSerialNumber]=useState(1);

    useEffect(()=>{
        const fetchQuote=async()=>{
            try {
                const response=await fetch('https://api.adviceslip.com/advice');
                const data=await response.json();
                if(data && data.slip && data.slip.advice){
                    setQuote(data.slip.advice)
                }else{
                    setError("Could'nt find advice right now!")
                }
                
            } catch (error) {
                setError("Could'nt find advice right now!")
            }
        }
        fetchQuote();
        const intervalId=setInterval(()=>{
            setSerialNumber((prevNumber)=>prevNumber+1);
            fetchQuote();
        },60000);
        return ()=> clearInterval(intervalId);
    },[]);
  return (
    <div className='quote-container'>
        <h1 className='serial-number'>Quote #{serialNumber}</h1>
        {error ? <p className='error-message'>{error}</p>:<p className='quote'>"{quote}"</p>}
        <div className='quoteIcon'>
        <img src={require('../assets/quoteIcon.png')} alt=''/>
        </div>
    </div>
  )
}

export default QuoteDisplay