import { Link } from 'react-router-dom';

const Index = (props) => {

    const loadStocks = () => {
        return props.stocks.map((stock,index) => (
            <div className="stock" key={index}>
                <Link>
                    <p className="stock-name">{stock.name}</p>
                </Link>
                <p>${stock.price}</p>
            </div>
        ));
    };

    const loadingStocks = () => {
        return <h1>Loading Stocks....</h1>;
    };

    return props.stocks ? loadStocks() : loadingStocks();
}

export default Index;