import React, { useState } from 'react';
import './Coin.css';
import {useNavigate} from 'react-router-dom';

const Coin = ({
  iid,
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  const navigate = useNavigate();
  const sendKey=(key) => {
    navigate(`/coins/${key}`)
  }
  return (
    <div className='coin-container'>
      <div className='coin-row' style={{cursor: "pointer"}}  onClick={() => sendKey(iid)}>
        <div className='coin'>
          <img className='coin-image' src={image} alt='crypto' />
          <h1 className='naame'>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>  
        <div className='coin-data'>
          <p className='coin-price'>${price}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
          )}

          <p className='coin-marketcap'>
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
