import { useEffect, useState, useCallback } from 'react';

const UserStockData = (props) => {
  console.log(props.userStocks)
  let totalInvestmentValues = 0;
  return (
    <div>
    <h1>Current Funds in Wallet: {props.userStocks.currentMoney}</h1>
    <ul>
      {props.userStocks.ownedStocks.map(stock => {
        const  numberOfShares = +(stock[0].ownedShares[0])
        totalInvestmentValues += (stock[0].stockToBuy.price * numberOfShares)
        return(
        <>
        <li>Ticker Symbol: {stock[0].stockToBuy.symbol}</li>
        <li>Current Price Per Share: {stock[0].stockToBuy.price}</li>
        <li>Number of shares you own:{stock[0].ownedShares[0]}</li>
        <li>Value of current owned shares: {stock[0].stockToBuy.price * numberOfShares}</li>
        </>
      )})}
    </ul>
    <h3>Total Value of Investments: {totalInvestmentValues}</h3>
    </div>
  )
}

export default UserStockData;

//retrieve user stock data based on stock.user
//map over user owned stocks and display their name, price
//multiply each stock price by ht enumber of shares prop
//add the results