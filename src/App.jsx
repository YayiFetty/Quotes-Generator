import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const BASE_URL = "https://type.fit/api/quotes";
function App() {
  const initial = {text:"", author:""}
  const [quotes, setQuotes] = useState(initial);
  
  async function fetchQuote(){
    try{
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        const randomLength = Math.floor((Math.random()) * data.length)
        const randomIndex = data[randomLength]
        setQuotes({text:randomIndex.text, author:randomIndex.author});
    }
    catch(error){
        console.error("Error fetched", error)
    }
  }
  useEffect(function(){
    fetchQuote();
  },[])
  return (
    <div className='max-w-md bg-slate-500 flex flex-col items-center justify-center mx-auto w-full h-60 '>
       <button onClick={fetchQuote} className='w-fit h-fit p-2 bg-black text-white'>Generate</button>
   
          <div className='flex flex-col'>
            <p>  {quotes.text}</p>
            <p>{quotes.author}</p>   
         </div>
    </div>
  )
}

export default App