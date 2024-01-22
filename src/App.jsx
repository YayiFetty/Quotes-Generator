import React, { useState } from 'react';
import { FaCamera, FaQuoteLeft } from 'react-icons/fa';

const BASE_URL = 'https://type.fit/api/quotes';

function App() {
  const initial = { text: '', author: '' };
  const [quotes, setQuotes] = useState(initial);
  const [count, setCount] = useState(0);
  const [showQuoteCard, setShowQuoteCard] = useState(false);

  async function fetchQuote() {
    try {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      const randomLength = Math.floor(Math.random() * data.length);
      const randomIndex = data[randomLength];
      setQuotes({ text: randomIndex.text, author: randomIndex.author });
      setCount((c) => c + 1);
      setShowQuoteCard(true); // Show the QuoteCard after fetching a quote
    } catch (error) {
      console.error('Error fetched', error);
    }
  }

  return (
    <div className='bg-gradient-to-bl from-blue-500 via-gray-500 to-gray-200 hover:bg-gradient-to-br flex items-center justify-center mx-auto w-full h-screen'>
      <div>
        {showQuoteCard && (
          <QuoteCard
            fetchQuote={fetchQuote}
            count={count}
            text={quotes.text}
            author={quotes.author}
          />
        )}
        {!showQuoteCard && (
          <button
            onClick={() => {
              fetchQuote();
            }}
            className='flex mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
          >
            Generate
          </button>
        )}
      </div>
    </div>
  );
}

function QuoteCard({ fetchQuote, text, author, count }) {
  return (
    <div className='relative w-96 h-72 bg-white rounded-lg'>
      <div className='min-w-20 w-20 h-20 bg-white shadow-md rounded-lg absolute -top-5 right-3'>
        <p className='flex justify-center items-center w-full h-full'>
          <FaCamera className='text-gray-400 text-4xl' />
        </p>
      </div>
      <div className='flex justify-evenly font-mono text-3xl py-5 '>
        <span>
          <FaQuoteLeft className='text-blue-500' />
        </span>
        <p className='text-black font-bold'>Quotes</p>
        <span></span>
      </div>
      <div className='h-32 text-center flex flex-col gap-4 px-6 mx-auto mb-6'>
        <p className='text-black font-mono font-bold'>&quot;{`${text}`}&quot;</p>
        <p className='text-gray-700 italic'> -{author}</p>
        <p className='text-gray-500 font-bold'>Numbers of clicked: {count}</p>
      </div>
      <button
        onClick={fetchQuote}
        className='flex mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
      focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5'
      >
        Generate
      </button>
    </div>
  );
}

export default App;
