import React, { useContext } from 'react'
import './Navbar.css'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event)=>{
    // console.log(event.target.value);
      switch (event.target.value){
        case "usd":{
          setCurrency({name : "usd" , symbol :"$" });
          break;
        }
        case "eur":{
          setCurrency({name : "eur" , symbol :"€" });
          break;
        }
        case "inr":{
          setCurrency({name : "inr" , symbol :"₹" });
          break;
        }
        default:{
          setCurrency({name : "usd" , symbol :"$" });
          break;
        }
        

      }
  }
  return (
    <div className='navbar'>
        <Link to={'/'}>
        <h1 className='logo'>Crypto Stalker</h1>
        </Link>
      <ul>
      {/* <Link to={'/'}>  <li>Home</li> </Link> */}
        {/* <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li> */}
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
        </select>
        <button>Sign Up</button>
      </div>
    </div>
  )
}

export default Navbar
