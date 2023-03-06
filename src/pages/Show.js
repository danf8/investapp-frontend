import { useParams } from "react-router-dom";

const Show = (props) => {
    const { id } = useParams();
    const stocks = props.stocks;
    const stock = stocks ? stocks.find((s) => s._id === id) : null;

    const loadedStocks = () => {
        return(
            <>
                <h1>{stock.name} ({stock.symbol})</h1>
                <p>${stock.price}</p>
                <p>%{stock.changesPercentage}</p>
                <p>Market Cap: {stock.marketCap}</p>
                <p>EPS: {stock.eps}</p>
                <p>PE: {stock.pe}</p>
            </>
        );
    };
    const loadingStocks = () => {
        return <h1>Loading Stocks...</h1>;
    };

    return(
        <div className="stock">
            {stock ? loadedStocks() : loadingStocks()}
        </div>
    );
};

export default Show;