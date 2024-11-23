import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';
const Home = () => {

  const {allcoin , currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');;
  const inputHandler = (event) => {
     setInput(event.target.value);
     if(event.target.value === ""){
      setDisplayCoin(allcoin);
     }
  }
  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allcoin.filter((item)=>{
      return  item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allcoin);
  }, [allcoin])
  

  return (
    <div className='home'>
      <div className="hero">
        <h1> Find Your <br/> Crypto Here </h1>
        <p>Get Updates about your crypto currency real quick</p>

        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} list='coinlist' type="text" placeholder='Search Crypto' required />
          <datalist id='coinlist'>
            {allcoin.map((item , index)=>(
              <option value={item.name} key={index}/>
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign : "center"}}>24H change</p>
          <p className='Market-gap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,12).map((item , index)=>(
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " +item.symbol}</p>
              </div>
              <p>{currency.symbol}  {item.current_price.toLocaleString()}  </p>
              <p className={item.price_change_percentage_24h < 0 ? "red" :"green"}>
                {Math.floor(item.price_change_percentage_24h * 100)/100}
              </p>
              <p className='Market-gap'>{currency.symbol}  {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
