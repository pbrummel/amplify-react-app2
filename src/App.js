import './App.css';
import React, {useState, useEffect } from 'react';
import './App.css';
import { get } from 'aws-amplify/api';
import GitHubBornOn from './GitHubBornOn';

function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([]);

  // Create additional state to hold user input for limit and start properties
  const [input, updateInput] = useState({ limit: 5, start: 0 });

  // Create a variable for loading
  const [loading, updateLoading] = useState(true);

  // Create a new function to allow users to update the input values
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value });
  }

  // Define function to call API
  const fetchCoins = async () => {
    updateLoading(true);
    const { limit, start } = input;

    //Get request with latest Amplify
    const restOperation = await get({
      apiName: "cryptoapi",
      path: "/coins",
      options: {
        queryParams: {
          limit: limit,
          start: start
        }
      }
    });

    // Source: https://docs.amplify.aws/react/build-a-backend/restapi/fetch-data/#accessing-response-payload
    const { body } = await restOperation.response;
    const json = await body.json();
    updateCoins(json.coins);
    // Cancels the "Loading ..." display after the coins data is acquired
    updateLoading(false);
  };


  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="App">
      <h1>Current Cryptocurrency Values</h1>
      {loading && <h2>Loading...</h2>}
      {!loading && coins.map((coin, index) => (
        <div key={index}>
          <h2>{coin.name} - {coin.symbol}</h2>
          <p>${coin.price_usd}</p>
        </div>
      ))}
      <input
        placeholder="start"
        onChange={e => updateInputValues('start', e.target.value)} />
      &nbsp;
      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit" />
      &nbsp;
      <button onClick={fetchCoins}>Fetch Coins</button>
      <GitHubBornOn />
    </div>
  );
}

export default App



/*
const App = () => {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])

  // Define function to all API
  async function fetchCoins() {
    const data = get('cryptoapi', '/coins')
    updateCoins(data.coins)
  }

  // Call fetchCoins function when component loads
  useEffect( () => {
    fetchCoins()
  }, [])

  return (
   <div className="App">
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.pirce_usd}</h5>
          </div>
        ))
      }
   </div> 
  );
}

export default App
*/