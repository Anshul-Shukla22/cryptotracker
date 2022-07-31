import React from 'react';
import './Coin.css';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Coin = ({
  iid,
  name,
  price,
  coinsymbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  const navigate = useNavigate();
  const { symbol } = CryptoState();
  const sendKey = (key) => {
    navigate(`/coins/${key}`)
  }
  return (
    <div className='coin-container'>
      <div className='coin-row' style={{ cursor: "pointer" }} onClick={() => sendKey(iid)}>
        <div className='coin'>
          <img className='coin-image' src={image} alt='crypto' />
          <h1 className='naame'>{name}</h1>
          <p className='coin-symbol'>{coinsymbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>{symbol}{price}</p>
          <p className='coin-volume'>{symbol}{volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
          )}

          <p className='coin-marketcap'>
            Mkt Cap: {symbol}{marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
