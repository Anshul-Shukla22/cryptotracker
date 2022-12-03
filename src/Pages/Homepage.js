import Coin from '../Components/Coin';
import React, { useState, useEffect } from 'react';
import '../App.css';
import './Homepage.css';
import { LinearProgress, Pagination } from '@mui/material';
import { CryptoState } from '../CryptoContext';

const Homepage = () => {
  const [search, setSearch] = useState('');
  const [page, setpage] = useState(1);
  const { currency } = CryptoState();
  const{loading,coins,fetchCoins} = CryptoState();
  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
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
              coinsymbol={coin.symbol}
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
            )}
    </div>
  );
}

export default Homepage;
