// import { useEffect, useState, useCallback } from 'react';
import '../Css/Userstock.css';

const UserStockData = (props) => {
  console.log(props.userStocks)
  let totalInvestmentValues = 0;
  if(props.userStocks.ownedStocks.length > 0) {
    
  return (
    <div className='userstockM'>
    <h1>Current Funds in Wallet: {props.userStocks.currentMoney}</h1>
    <ul>
      {props.userStocks.ownedStocks.map(stock => {
        const  numberOfShares = +(stock[0].ownedShares[0])
        totalInvestmentValues += (stock[0].stockToBuy.price * numberOfShares)
        return(
        <section className='userstock'>
        <li><strong>Ticker Symbol:</strong> {stock[0].stockToBuy.symbol}</li>
        <li><strong>Current Price Per Share:</strong> {stock[0].stockToBuy.price}</li>
        <li><strong>Number of shares you own:</strong>{stock[0].ownedShares[0]}</li>
        <li><strong>Value of current owned shares:</strong> {stock[0].stockToBuy.price * numberOfShares}</li>
        </section>
      )})}
    </ul>
    <h3>Total Value of Investments: {totalInvestmentValues}</h3>
    </div>
  )
} else {
  return (
    <div className='nostock'>
      <h1>Current Funds in Wallet: {props.userStocks.currentMoney}</h1>
    </div>
  )
}
}

export default UserStockData;

//retrieve user stock data based on stock.user
//map over user owned stocks and display their name, price
//multiply each stock price by ht enumber of shares prop
//add the results