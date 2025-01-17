import { useParams } from 'react-router-dom';
import { useState} from 'react';
import Modal from 'react-modal';
// import ModalAction from './ModalAction';
import '../css/show.css';
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
 
const Show = (props) => {
    const { id } = useParams();
    const stocks = props.stocks;
    const stock = stocks ? stocks.find((s) => s.symbol === id) : null;
    const checkUserStockAmt = props.userStocks.ownedStocks ? props.userStocks.ownedStocks.find((s) => s.symbol === id && s.ownedShares > 0) : null;
    const [newForm, setCommentForm] = useState({
        comments: ''
    });
    
    const [sellStock, setSellStock] = useState({
        symbol: '',
        currentPrice: stock.price,
        soldShares: 0,
    });

    const handleSellChange = (event) => {
        setSellStock(() => ({
            symbol: stock.symbol,
            currentPrice: stock.price,
            [event.target.name]: parseInt([event.target.value]),
        }));
    };

    const handleBuyChange = (event) => {
        props.setBuyForm((prevState) => ({
            price: stock.price,
            currentPrice: stock.price,
            name: stock.name,
            symbol: stock.symbol,
            [event.target.name]: parseInt([event.target.value]),
        }));
    };

    const handleSellStocksUpdate = (event) => {
        event.preventDefault();
        props.updateOwnedStocks(sellStock, props.user.uid, "user/form/sell/");
        // props.openModal();
        props.openModalDisplay('sellBox', 'Stock Sold!');
        setSellStock({
            symbol: stock.symbol,
            currentPrice: stock.price,
            soldShares: 0,
        });
    };

    const handleOwnedStocksUpdate = (event) => {
       event.preventDefault();
       props.updateOwnedStocks(props.newBuyForm, props.user.uid, 'users/');
    //    props.openModalDisplay('purchaseBox', 'Stock Purchased!');
       props.openModal();
       props.setBuyForm({
        symbol: '',
        name: '',
        ownedShares: 0,
        price: '',
        currentPrice: 0,
    });
    };

    const handleCommentChange = (event) => {
        setCommentForm((prevState) => ({
            ...prevState,
            [event.target.name]: [event.target.value],
        }));
    };

    const handleCommentUpdate = (event) => {
        event.preventDefault();
        props.updateStockComment(newForm, stock.symbol);
        setCommentForm({
            comments: ''
        });
    };

    const loadedStocks = () => {
        const chartDate = stock.historical.map((s, i) => s.date);
        const chartPrices = stock.historical.map((s, i) => s.close);
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: stock.name,
              },
            },
          };
    
          const data = {
            labels: chartDate,
            datasets: [
              {
                label: `${stock.name} 60 Day Historical Prices`,
                data: chartPrices,
                borderColor: 'rgba(94, 219, 94, 1)',
                backgroundColor: 'rgba(162, 216, 162, 1.0)',
              },
            ],
          };
        return(
            <>
                <h1>{stock.name} ({stock.symbol})</h1>
                <p className="price">Current Price: ${stock.price} ( {stock.changesPercentage}% )</p>
                <Line options={options} data={data} />
                <hr />
                <br />
                <div className="info">
                    <p className="mkt">Market Cap: {stock.marketCap.toLocaleString()}</p>
                    <p className="eps">EPS: {stock.eps}</p>
                    <p className="pe">PE: {stock.pe === null ? 'Not Available' : stock.pe}</p>
                    <br />
                </div>
            </>
        );
    };

    const loadComments = stock.comments.map((c,i) => (
        <ul className="commentList" key={i}>
            <li className="comments" key={i}>
                {c}
            </li>
        </ul>
    ));

    const availableToSell = () => {
        return(
            <form id='sellBox' onSubmit={handleSellStocksUpdate}>
                <input type="number" name="soldShares" value={sellStock.soldShares} placeholder='Enter the number of shares to sell' onChange={handleSellChange} />
                <input type='submit' value='Sell'/>
            </form>
        );
    };

    const notAvailableToSell = () => {
        return(
            <div>
                <p>You have no shares available of {stock.name} to sell. Short selling is not supported on your account at this time.</p>
            </div>
        );
    };

    const noComments = () => {
       return <p>Be the first to comment on {stock.name}</p>;
    };

    const loadingStocks = () => {
        return <h1>Loading Stocks...</h1>;
    };
    console.log(props.modalOpen)

    return(
        <div className="stock">
            {stock ? loadedStocks() : loadingStocks()}
            <div className="commentBox">
                {loadComments.length > 0 ? loadComments : noComments()}
            </div>
            <section>
                <form id="addComment" onSubmit={handleCommentUpdate}>
                    <input type='text' name='comments' value={newForm.comments} placeholder='Add a comment' onChange={handleCommentChange}/>
                    <input type='submit' value='submit'/>
                </form>
                <div className='buyOrSell'>
                    <form id="purchaseBox" onSubmit={handleOwnedStocksUpdate}>
                        <input type='number' name='ownedShares' value={props.newBuyForm.ownedShares} placeholder='Enter the number of shares to purchase' onChange={handleBuyChange}/>
                        <input type='submit' value='Buy'/>
                    </form>
                    {checkUserStockAmt ? availableToSell() : notAvailableToSell()}
                </div>
                <Modal isOpen={props.modalOpen} onRequestClose={props.closeModal} appElement={document.getElementById('purchaseBox')} >
                    <h2>Stock Purchased!</h2>
                    <button onClick={props.closeModal}>Close</button>
                </Modal>
            </section>
        </div>
    );
};

export default Show;