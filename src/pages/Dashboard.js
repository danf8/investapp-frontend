import { Link } from 'react-router-dom';

const Dashboard = (props) => {
    if(props.userStocks !== null) {
        const portfolioReturn = (((props.totalInvestmentValues + props.userStocks.currentMoney) - props.userStocks.startingMoney) / props.userStocks.startingMoney) * 100;
        return(
            <>
                <div>
                    <h1>Welcome to your dashboard, {props.user.displayName}</h1>
                    <h4>You've been a memeber since: {props.user.metadata.creationTime}</h4>
                    <h4>Current available funds: ${props.userStocks.currentMoney}</h4>
                    <h4>Current value of investments: ${props.totalInvestmentValues}</h4>
                    <h4>Performance: {portfolioReturn}%</h4>
                </div>
  
                    {props.userStocks.ownedStocks.map((stock, i) => {
                        return(
                            <div key={i}>
                                <p>{stock.name}</p>
                                <p>{stock.symbol}</p>   
                                <p>{stock.price}</p>
                                <p>{stock.currentPrice}</p>
                                <p>{stock.ownedShares}</p>
                                
                                <Link to={'/stocks/' + stock.symbol}>Sell Stock</Link>
                            </div>
                            )
                    })}

            </>
        );
    } else {
        return(
            <div>
                <h1>Welcome to your dashboard, {props.user.displayName}</h1>
                <h4>You've been a memeber since: {props.user.metadata.creationTime}</h4>
            </div>
        );
    };
};

export default Dashboard;
