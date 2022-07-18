import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo';
import './CoinPage.css';
import parse from 'html-react-parser';
const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
  const fetchCoin = async () => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className='container'>
      <div className="sidebar">
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: '20' }}
        />
        <Typography variant="h3" className='heading'>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className='description'>
          {coin? parse(coin?.description.en.split(". ")[0]):''}
        </Typography>
        <div className='marketData'>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className='heading'>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className='heading'>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className='heading'>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  )
}
export default CoinPage;