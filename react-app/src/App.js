import React, { useState } from 'react';
import './App.css';
import currencies from './currencies';


function App() {
  const [result, setResult] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(0);
  console.log(currencies)
  const fetchData = async () => {
    try {
      console.log(fromCurrency, toCurrency)
      const response = await fetch(`https://v6.exchangerate-api.com/v6/f0cc3246c82a31608626bbd8/latest/${fromCurrency}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      const rate = data.conversion_rates[toCurrency];
      // console.log(rate)
      // console.log(toCurrency)
      const finalAmount = amount * rate;
      console.log(finalAmount)
      setResult(finalAmount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="App bg-blue-100 p-6 h-screen flex justify-center items-center">
      <div className="inputSection bg-white rounded-lg shadow-lg p-6 w-1/2 border-blue-500" style={{ borderTop: "4px solid #4299E1" }}>
        <div className="result text-3xl py-10">{result}</div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full mt-4 px-4 mb-4 md:mb-0">
            <label htmlFor="amount" className="block text-left">Amount:</label>
            <input
              type="number"
              value={amount}
              id="amount"
              onChange={handleAmountChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mt-4">
            <label htmlFor="fromCurrency" className="block text-left">From Currency:</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              className="w-full border p-2 rounded"
            >
              {/* <option value="value" disabled>Choose from currency</option> */}
              <option value="" disabled>Select from currency</option>
              {Object.entries(currencies).map(([currencyCode, currencyName]) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyName}: {currencyCode}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-4">
            <label htmlFor="toCurrency" className="block text-left">To Currency:</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              className="w-full border p-2 rounded"
            >
              {/* <option value="value" disabled>Choose to currency</option> */}
              <option value="" disabled>Select to currency</option>
              {Object.entries(currencies).map(([currencyCode, currencyName]) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyName}: {currencyCode}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          id="convertButton"
          onClick={fetchData}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Convert
        </button>
      </div>
    </div>





  );
}

export default App;
