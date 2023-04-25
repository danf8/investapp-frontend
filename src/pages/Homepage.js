import {useState, useEffect, useCallback} from 'react';
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
  import '../css/homepage.css';

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
    
    const getStockIndex = useCallback( async () => {
        try {
                const response = await fetch(props.API_URL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json',
                    }
                });
                const data = await response.json();
                setStockIndex(data);
        } catch (error) {
            // console.error(error);
        };
    }, [props.API_URL])

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
  },[getStockIndex]);

    return(
      <>
      {!props.user ? (
        <div id='homepage'>
            <h1>Start learning about stocks with just one click - Log in now!</h1><br/><br/>
        </div>
        ) : null};
      {stockIndexState ?  loadChart(): loadingChart()}
        </>
    );
};

export default Homepage;