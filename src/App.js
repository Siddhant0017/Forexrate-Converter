
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrencies, setTargetCurrencies] = useState(['EUR', 'INR', 'JPY']);
  const [forexData, setForexData] = useState(null);

  useEffect(() => {
    fetchForexData();
  }, [baseCurrency, targetCurrencies]);

  const fetchForexData = async () => {
    try {
      const currenciesParam = targetCurrencies.join(',');
      const response = await fetch(`https://api.forexrateapi.com/v1/latest?api_key=43027fb31b09ae2548434e780dca90fc&base=${baseCurrency}&currencies=${currenciesParam}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setForexData(data);
    } catch (error) {
      console.error('Error fetching forex data:', error);
    }
  };

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
    
    if (event.target.value === 'EUR') {
      setTargetCurrencies(['USD', 'INR', 'JPY']);
    } else {
      
      setTargetCurrencies(['EUR', 'INR', 'JPY']);
    }
  };

  return (
    <div className="App">
      <h1>Forex Rates</h1>
      <div className="base-currency-select">
        <label htmlFor="baseCurrency">Select Base Currency:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={handleBaseCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          
        </select>
      </div>
      {forexData && (
        <div className="forex-data">
          <p>Base Currency: {forexData.base}</p>
          <ul>
            {Object.keys(forexData.rates).map(currency => (
              <li key={currency}>
                {currency}: {forexData.rates[currency]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

