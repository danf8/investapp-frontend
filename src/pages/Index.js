import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../Css/index.css'



const Index = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(props.stocks);

  const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
      const filteredStocks = props.stocks.filter((stock) =>
          stock.name && stock.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
      setFilteredStocks(filteredStocks);
  };

  const handleSearchClick = () => {
      const filteredStocks = props.stocks.filter((stock) => {
        return stock.name && stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if (filteredStocks.length > 0) {
        setFilteredStocks(filteredStocks);
      } else {
        alert(`No results for "${searchTerm}".`);
        setSearchTerm('');
        setFilteredStocks(props.stocks);
      }
    };

  const loadStocks = () => {
    if (searchTerm) {
      return filteredStocks && filteredStocks.map((stock,index) => (
          <div className="stocks" key={index}>
              <Link to={`/stocks/${stock._id}`}>
                  <p className="stock-name">{stock.name}</p>
              </Link>
              <p>${stock.price}</p>
          </div>
      ));
    } else {
      return props.stocks.map((stock,index) => (
          <div className="stocks" key={index}>
              <Link to={`/stocks/${stock._id}`}>
                  <p className="stock-name">{stock.name}</p>
              </Link>
              <p>${stock.price}</p>
          </div>
        ));
      }
    };

  const loadingStocks = () => {
      return <h1>Loading Stocks....</h1>;
  };

  return (
      <>
        {props.user ? (
        <>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Stocks"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <button onClick={handleSearchClick}>Search</button>
          </div>
          <section>{props.stocks ? loadStocks() : loadingStocks()}</section>
        </>
        ) : (
        <h2>Please Login to access stock info</h2>
        )}
      </>
    );
};

export default Index;