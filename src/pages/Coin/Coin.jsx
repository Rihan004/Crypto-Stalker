import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Necessary for Chart.js

import "./Coin.css";

const Coin = () => {
  const { coinid } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext); // currency has `name` and `symbol`
  const [days, setDays] = useState(1);

  const fetchCoinData = async () => {
    
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Jx3Fm2inDJbtiKfhYcPuPgeH",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-Jx3Fm2inDJbtiKfhYcPuPgeH",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=${currency.name}&days=${days}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res.prices))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinid, currency, days]);

  const data = {
    labels: historicalData.map((item) =>
      new Date(item[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    ),
    datasets: [
      {
        label: `Price ( Past ${days} Days ) in ${currency.symbol}`,
        data: historicalData.map((item) => item[1]),
        borderColor: "#FFD700",
        fill: false,
        tension: 0.1,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
  };

  if (!coinData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if(coinData && historicalData){return (
    <div className="coin">
      {/* Left Section */}
      <div className="coin-details">
        <img src={coinData.image.large} alt={coinData.name} />
        <h1>{coinData.name}</h1>
        <p className="description">
          {coinData.description.en.split(". ")[0]}
        </p>
        <p><b>Rank:</b> {coinData.market_cap_rank}</p>
        <p>
          <b>Current Price:</b> {currency.symbol}{" "}
          {coinData.market_data.current_price[currency.name]}
        </p>
        <p>
          <b>Market Cap:</b> {currency.symbol}{" "}
          {coinData.market_data.market_cap[currency.name]}
        </p>
      </div>

      {/* Right Section */}
      <div className="coin-chart">
        <Line data={data} options={options} />
        <div className="time-buttons">
          {[
            { label: "24 Hours", value: 1 },
            { label: "30 Days", value: 30 },
            { label: "3 Months", value: 90 },
            { label: "1 Year", value: 365 },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setDays(range.value)}
              className={days === range.value ? "active" : ""}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}else{
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  };
};

export default Coin;
