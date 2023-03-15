import { useParams } from "react-router-dom";
import { useState} from 'react';

const Show = (props) => {
    const { id } = useParams();
    const stocks = props.stocks;
    const stock = stocks ? stocks.find((s) => s._id === id) : null;
    const percentChange = stock.changesPercentage.toLocaleString(undefined, { maximumFractionDigits: 3});
    const [newForm, setCommentForm] = useState({
        comments: ''
    });

    const handleChange = (event) => {
        setCommentForm((prevState) => ({
            ...prevState,
            [event.target.name]: [event.target.value],
        }));
    };

    const handleUpdate = (event) => {
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
        <ul className='commentList' key={i}>
            <li className="comments" key={i}>
                {c}
            </li>
            <hr className="commentRow" />
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
                <form onSubmit={handleUpdate}>
                    <input type="text" name="comments" value={newForm.comments} placeholder="Add a comment" onChange={handleChange}/>
                    <input type="submit" value="submit"/>
                </form>
            </section>
        </div>
    );
};

export default Show;