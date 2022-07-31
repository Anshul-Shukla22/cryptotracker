import { Button, LinearProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import CoinInfo from '../Components/CoinInfo';
import './CoinPage.css';
import parse from 'html-react-parser';
import { CryptoState } from '../CryptoContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinPage = () => {

  const { id } = useParams();
  const fetchCoin = async () => {
    const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    setCoin(data);
  };
  const { coin, setCoin, currency, symbol,user,watchlist,setAlert } = CryptoState();
  useEffect(() => {
    /* eslint-disable */
    fetchCoin();
  }, [symbol]);
  const inWatchlist = watchlist.includes(coin?.id);
  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc (
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

 
  if (!coin) {return <LinearProgress style={{ backgroundColor: "gold" }} />};
  return (
    <div className='container' style={{ marginTop: 4 }} >
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
          {coin ? parse(coin?.description.en.split(". ")[0]) : ''}
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
              {numberWithCommas(
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
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
            className='addButton'
              variant="outlined"
              style={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#1d92ee" : "#EEBC1D",
                color: inWatchlist ? "white" : "black",
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>

  );
}
export default CoinPage;