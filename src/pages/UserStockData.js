import '../css/userstock.css';

const UserStockData = (props) => {
  if(props.userStocks !== null && props.stocks !== null) {
    console.log(props.userStocks)
    return(
      <div className='userstockM'>
      <h1>Current Funds in Wallet: ${props.userStocks.currentMoney}</h1>
      <h3>Total Value of Investments: ${props.userStocks.totalInvestmentValue}</h3>
      <ul>
      {props.userStocks.ownedStocks.map((stock, i) => {
        const roundPrice = (stock.currentPrice * stock.ownedShares).toFixed(2)
        return(
        <section className='userstock' key={i}>
          <li><strong>Ticker Symbol: </strong>{stock.symbol}</li>
          <li><strong>Purchased Price: $</strong>{stock.price}</li>
          <li><strong>Current Price: $</strong>{stock.currentPrice}</li>
          <li><strong>Number of shares you own: </strong>{stock.ownedShares}</li>
          <li><strong>Value of current owned shares: $</strong>{roundPrice}</li>
        </section>
        )
        })}
        </ul>
      </div>
    );
  } else {
    return(
      <div>
        <h1>whoops! looks like you haven't purchased a stock yet!</h1>
      </div>
    );
  };
};

export default UserStockData;


