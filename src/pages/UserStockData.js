import '../css/userstock.css';

const UserStockData = (props) => {
  if(props.userStocks !== null) {
    return(
      <div className='userstockM'>
        <h1>Current Funds in Wallet: ${props.userStocks.currentMoney}</h1>
        <h3>Total Value of Investments: ${props.totalInvestmentValues}</h3>
        <ul>
          {props.userStocks.ownedStocks.map((stock, i) => {
            let currentPrice = props.stocks.filter((s) => s.symbol === props.userStocks.ownedStocks[i][0].stockPurchased.symbol);
            return(
            <section className='userstock' key={i}>
              <li><strong>Ticker Symbol: </strong> {stock[0].stockPurchased.symbol}</li>
              <li><strong>Purchased Price: $</strong> {stock[0].stockPurchased.price}</li>
              <li><strong>Current Price: $</strong> {currentPrice[0].price}</li>
              <li><strong>Number of shares you own: </strong>{stock[0].ownedShares}</li>
              <li><strong>Value of current owned shares: $</strong> {stock[0].stockPurchased.price * stock[0].ownedShares}</li>
            </section>
            )})}
        </ul>
      </div>
    );
  } else {
    return(
      <div>
        <h1>whoops! looks like you dont haven't purchased a stock yet!</h1>
      </div>
    );
  };
};

export default UserStockData;