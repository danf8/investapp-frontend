// import { useEffect, useState, useCallback } from 'react';
import '../Css/Userstock.css';

const UserStockData = (props) => {

  // const updateNewUser = async(ownedStocks, currentMoney, uid) => {
  //   try {
  //     if (props.user) {
  //       const token = await props.user.getIdToken();
  //       await fetch('http://localhost:3002/user', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'Application/json',
  //           'Authorization': 'Bearer ' + token
  //         },
  //         body: JSON.stringify({ownedStocks, currentMoney, uid}) // empty object for now
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log(props.userStocks)
  let totalInvestmentValues = 0;
  if(props.userStocks !== null) {
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
    <div>
      <h1>whoops! looks like you dont have a wallet yet!</h1>
       <h2> log out and back in to create funds and a place to store your investments!</h2>
    </div>
  )
}
}

export default UserStockData;

//retrieve user stock data based on stock.user
//map over user owned stocks and display their name, price
//multiply each stock price by ht enumber of shares prop
//add the results