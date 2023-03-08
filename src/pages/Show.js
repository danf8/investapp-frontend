import { useParams } from "react-router-dom";
import { useState } from 'react';

const Show = (props) => {
    const { id } = useParams();
    const stocks = props.stocks;
    const stock = stocks ? stocks.find((s) => s._id === id) : null;
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
                <p>${stock.price}</p>
                <p>{stock.changesPercentage}%</p>
                <p>Market Cap: {stock.marketCap}</p>
                <p>EPS: {stock.eps}</p>
                <p>PE: {stock.pe}</p>
            </>
        );
    };

    // useEffect(() => {
    //     if(stock) {
    //         setCommentForm(stock);
    //     };
    // },[]);


    const loadComments = stock.comments.map((c,i) => ( 
        <ul key={i}>
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
            {loadComments.length > 0 ? loadComments : noComments()}
            <section>
                <form onSubmit={handleUpdate}>
                    <input type="text" name="comments" value={newForm.comments} onChange={handleChange}/>
                    <input type="submit" value="submit"/>
                </form>
            </section>
        </div>
    );
};

export default Show;