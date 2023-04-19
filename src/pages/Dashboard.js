
const Dashboard = (props) => {
    if(props.userStocks !== null) {
        let totalInvestmentValues = 0;
        props.userStocks.ownedStocks.map((stock, i) =>  { totalInvestmentValues += (stock[0].stockPurchased.price * stock[0].ownedShares);
           return totalInvestmentValues
           });
           const portfolioReturn = (((totalInvestmentValues + props.userStocks.currentMoney) - props.userStocks.startingMoney) / props.userStocks.startingMoney) * 100;
        return(
            <div>
                <h1>Welcome to your dashboard, {props.user.displayName}</h1>
                <h4>You've been a memeber since: {props.user.metadata.creationTime}</h4>
                <h4>Current avaiable funds: ${props.userStocks.currentMoney}</h4>
                <h4>Current value of investments: ${totalInvestmentValues}</h4>
                <h4>Performance: {portfolioReturn}%</h4>
            </div>
        )
    } else {
        return (
            <div>
            <h1>Welcome to your dashboard, {props.user.displayName}</h1>
            <h4>You've been a memeber since: {props.user.metadata.creationTime}</h4>
        </div>
        )
    }
};

export default Dashboard;
