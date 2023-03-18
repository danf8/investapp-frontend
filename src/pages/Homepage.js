import {useState, useEffect} from 'react';
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

const Homepage = (props) => {
    const [stockIndexState, setStockIndex ] = useState(null)
    // const API_INDEX_URL = "http://localhost:5000/";
    const API_INDEX_URL = "https://investing-buddy.herokuapp.com/";

    const getStockIndex = async () => {
        try {
                const response = await fetch(API_INDEX_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                    }
                });
                const data = await response.json();
                    //reverse stockindexstate to display information in correct over on chart
                data[0].historical = data[0].historical.reverse()
                setStockIndex(data);    
        } catch (error) {
            console.error(error);
        };
    };

//loads chart 
  const loadChart = () => {
    const stockClose = stockIndexState[0].historical.map((stock) => stock.close)
    const labels = stockIndexState[0].historical.map((stock) => stock.date) 

  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' 
        },
        title: {
          display: true,
          text: 'SPY Chart',
        },
      },
    };
    //set chart data
  const data = {
      labels: labels,
      datasets: [
        {
          label: 'SPY Historical Prices',
          data: stockClose,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
          return <Line options={options} data={data} />;
      };

    const loadingChart = () => {
        return <h1>Loading chart.....</h1>;
    };

    useEffect(() => {
      getStockIndex();
  },[]);

    return(
        <div>
            <h1>Please login to start your journey</h1>
            {stockIndexState ?  loadChart(): loadingChart()}
        </div>
    );
};

export default Homepage;