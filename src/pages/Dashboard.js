import { Link } from 'react-router-dom';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = (props) => {
    const userPerformanceChart = () => {
        if(props.userStocks.performance.historical.length > 0){
        const chartDate = props.userStocks.performance.historical.map((day) => day.date);
        const chartPerformance = props.userStocks.performance.historical.map((day) => day.totalValue);

        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: props.user.displayName,
              },
            },
          };
    
          const data = {
            labels: chartDate,
            datasets: [
              {
                label: 'Portfolio Performance',
                data: chartPerformance,
                borderColor: 'rgba(94, 219, 94, 1)',
                backgroundColor: 'rgba(162, 216, 162, 1.0)',
              },
            ],
          };
          return  <Line options={options} data={data} />;
        };
        return <h4>No historical data to display, please check back later</h4>;
    };

    if(props.userStocks !== null) {
        const portfolioReturn = ((((props.userStocks.totalInvestmentValue + props.userStocks.currentMoney) - props.userStocks.startingMoney) / props.userStocks.startingMoney) * 100).toLocaleString(undefined, { maximumFractionDigits: 2});
        return(
            <>
                <div>
                    <h1>Welcome to your dashboard, {props.user.displayName}</h1>
                    <h4>You've been a memeber since: {props.user.metadata.creationTime}</h4>
                    <h4>Current available funds: ${props.userStocks.currentMoney}</h4>
                    <h4>Current value of investments: ${props.userStocks.totalInvestmentValue > 0 ? props.userStocks.totalInvestmentValue : 0}</h4>
                    <h4>Performance: {portfolioReturn ? portfolioReturn : 0 }%</h4>
                    {userPerformanceChart()}
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
