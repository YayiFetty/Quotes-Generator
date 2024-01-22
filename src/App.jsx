import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaCamera,FaQuoteLeft } from "react-icons/fa";

const BASE_URL = "https://type.fit/api/quotes";
function App() {
  const initial = {text:"", author:""}
  const [quotes, setQuotes] = useState(initial);
  const [count, setCount] = useState(0)
  async function fetchQuote(){
    try{
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        const randomLength = Math.floor((Math.random()) * data.length)
        const randomIndex = data[randomLength]
        setQuotes({text:randomIndex.text, author:randomIndex.author});
        setCount((c) => c + 1);
    }
    catch(error){
        console.error("Error fetched", error)
    }
  }
  useEffect(function(){
    fetchQuote();
  },[])
  return (
    <div className=' flex items-center justify-center mx-auto w-full h-screen '>
      <div className=''>
      
           <QuoteCard fetchQuote={fetchQuote} text={quotes.text} author={quotes.author}/>
    
      </div>

       </div>
  )
}

export default App

function QuoteCard({fetchQuote, text, author}){
  return<div className=' relative max-w-sm w-full h-60 bg-white rounded-lg '>
    <div className=' w-20 h-20 bg-white shadow-md rounded-lg absolute -top-5 right-3'>
        <p className='flex justify-center items-center w-full h-full'><FaCamera className=' text-gray-400  text-4xl' /></p>
    </div>
    <div className='flex justify-evenly font-mono text-3xl my-7  '>
        <span><FaQuoteLeft  className='text-blue-500' /> </span>
        <p className='text-black font-bold'>Quotes</p>
        <span></span>
    </div>
      <div className=' max-w-full text-center flex flex-col gap-4 h-24 bg-red-200 px-6 mx-auto mb-2'>
        <p className='text-red-500'>&quot;{ `${text}`}&quot;</p>
        <p className='text-blue-500'> -{author}</p>
      </div>
      <button onClick={fetchQuote} className='w-fit h-fit flex items-center mx-auto p-2 rounded-2xl outline-double outline-2 outline-blue-800 bg-blue-600  text-white'>Generate</button>
   
  </div>
}