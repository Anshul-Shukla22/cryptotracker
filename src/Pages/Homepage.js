import Coin from '../Components/Coin';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import './Homepage.css';
import { Pagination } from '@mui/material';

const Homepage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setpage] = useState(1);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1000&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className='coin-app'>
        <div className='coin-search'>
          <h1 className='coin-text'>Search a currency</h1>
          <form>
            <input
              className='coin-input'
              type='text'
              onChange={handleChange}
              placeholder='Search'
            />
          </form>
        </div>
        {filteredCoins.slice((page - 1) * 10, (page - 1) * 10 + 10).map(coin => {
          return (
            <Coin
              key={coin.id}
              iid={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
        <Pagination
          count={Math.ceil(filteredCoins.length / 10)}
          page={page}
          onChange={(e, value) => { setpage(value) }}
          variant="outlined"
          style={{ marginTop: 20 }}
        />
      </div>
    </div>
  );
}

export default Homepage;
