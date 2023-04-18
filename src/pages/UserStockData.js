import '../Css/Userstock.css';

const UserStockData = (props) => {

if(props.userStocks !== null) {
  let totalInvestmentValues = 0;
  props.userStocks.ownedStocks.map((stock, i) =>  { totalInvestmentValues += (stock[0].stockPurchased.price * stock[0].ownedShares);
     return{ totalInvestmentValues}
     });
  return (
    <div className='userstockM'>
    <h1>Current Funds in Wallet: ${props.userStocks.currentMoney}</h1>
    <h3>Total Value of Investments: ${totalInvestmentValues}</h3>
    <ul>
      {props.userStocks.ownedStocks.map((stock, i) => {
        const numberOfShares = +(stock[0].ownedShares)
        totalInvestmentValues += (stock[0].stockPurchased.price * numberOfShares)
        return(
        <section className='userstock' key={i}>
        <li><strong>Ticker Symbol: </strong> {stock[0].stockPurchased.symbol}</li>
        <li><strong>Current Price Per Share: $</strong> {stock[0].stockPurchased.price}</li>
        <li><strong>Number of shares you own: </strong>{stock[0].ownedShares}</li>
        <li><strong>Value of current owned shares: $</strong> {stock[0].stockPurchased.price * numberOfShares}</li>
        </section>
      )})}
    </ul>
    </div>
  )
} else {
  return (
    <div>
      <h1>whoops! looks like you dont haven't purchased a stock yet!</h1>
    </div>
  )
}
}

export default UserStockData;