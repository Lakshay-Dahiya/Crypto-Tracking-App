import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import {useParams} from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart2 from '../../components/LineChart/LineChart2';
export default function Coin () {

  const {coinId} = useParams();
  const [coinData , setCoinData] = useState();
  const [historicalData , setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);
  const fetchCoinData = async () => {
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-NN2cahwabeqcLVMrgLS8uxSH'}
    };
      
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`,options)
        .then(response => response.json())
        .then(response => setCoinData(response))
        .catch(err => console.error(err));    
  }

  const fetchHistoricalData = async () => {
    const options = {
        method: 'GET',
        headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-NN2cahwabeqcLVMrgLS8uxSH'}
      };
      
      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency.name}&from=1711929600&to=1721570171`)
        .then(response => response.json())
        .then(response => setHistoricalData(response))
        .catch(err => console.error(err));

  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])
  
  if (coinData && historicalData) {
    return (
        <div className='coin'>
            <div className='coin-name'>
                <img src = {coinData.image.large} alt = ""/>
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
            </div>
            <div className="coin-chart">
                <LineChart2 historicalData = {historicalData}/>
            </div>
            <div className="coin-info">
                <ul>
                    <li>Current Price</li>
                    <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>Market Cap</li>
                    <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>24 Hour High</li>
                    <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
                </ul>
                <ul>
                    <li>24 Hour Low</li>
                    <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
                </ul>
            </div>
        </div>
    )
  }
  else {
    return (
        <div className='spinner'>
            <div className='spin'></div>
        </div>
      )    
  }

}

