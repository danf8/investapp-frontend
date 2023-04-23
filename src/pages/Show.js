import { useParams } from 'react-router-dom';
import { useState} from 'react';
import Modal from 'react-modal';
import '../css/show.css';
 
const Show = (props) => {
    const { id } = useParams();
    const stocks = props.stocks;
    const stock = stocks ? stocks.find((s) => s._id === id) : null;
    const percentChange = stock.changesPercentage.toLocaleString(undefined, { maximumFractionDigits: 3});
    const [newForm, setCommentForm] = useState({
        comments: ''
    });

    const handleBuyChange = (event) => {
        props.setBuyForm((prevState) => ({
            price: stock.price,
            currentPrice: stock.price,
            name: stock.name,
            symbol: stock.symbol,
            [event.target.name]: parseInt([event.target.value]),
        }));
    };

    const handleOwnedStocksUpdate = (event) => {
       event.preventDefault();
       props.updateOwnedStocks(props.newBuyForm, props.user.uid);
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
        props.updateStockComment(newForm, stock._id);
        setCommentForm({
            comments: ''
        });
    };

    const loadedStocks = () => {
        return(
            <>
                <h1>{stock.name} ({stock.symbol})</h1>
                <p className="price">Current Price: ${stock.price} ( {percentChange}% )</p>
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

    const noComments = () => {
       return <p>Be the first to comment on {stock.name}</p>;
    };

    const loadingStocks = () => {
        return <h1>Loading Stocks...</h1>;
    };

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
                <form id="purchaseBox" onSubmit={handleOwnedStocksUpdate}>
                    <input type='number' name='ownedShares' value={props.newBuyForm.ownedShares} placeholder='Enter the number of shares to purchase' onChange={handleBuyChange}/>
                    <input type='submit' value='Buy it now'/>
                </form>
                <Modal isOpen={props.modalOpen} onRequestClose={props.closeModal} appElement={document.getElementById('purchaseBox')} >
                    <h2>Stock Purchased!</h2>
                    <button onClick={props.closeModal}>Close</button>
                </Modal>
            </section>
        </div>
    );
};

export default Show;