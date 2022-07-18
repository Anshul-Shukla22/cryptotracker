import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CoinInfo.css';
import { HistoricalChart } from '../config/api';
import { createTheme, ThemeProvider } from '@mui/system';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale
} from "chart.js";
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };


  useEffect(() => {
    fetchHistoricData();
  },  [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="infocontainer">
        {!historicalData && flag === false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (<div style={{ height: "100%", width: "100%" }}>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `Price (Past ${days} Days) in${currency}`,
                  data: historicalData.map((coin) => coin[1]),
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </div>)}
      </div>
    </ThemeProvider>

  );
}

export default CoinInfo;
