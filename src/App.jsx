import React, { useState } from "react";

const BASE_URL = "https://type.fit/api/quotes";

export default function App() {
  const [quote, setQuote] = useState("");

  async function fetchQuote() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].text);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }

  return (
    <div>
      <button onClick={fetchQuote}>Generate</button>
      <p>{quote}</p>
    </div>
  );
}
