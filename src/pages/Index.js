import { Link } from 'react-router-dom';

const Index = (props) => {

    const loadStocks = () => {
        return props.stocks.map((stock) => (
            <div>
                <h1>{stock.name}</h1>
                <h2>${stock.price}</h2>
            </div>
        ));
    };

    const loadingStocks = () => {
        return <h1>Loading Stocks....</h1>;
    };

    return props.stocks ? loadStocks() : loadingStocks();
}

export default Index;