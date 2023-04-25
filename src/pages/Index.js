import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import '../css/index.css';

const Index = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState(props.stocks);

  const {user, API_URL, setStocks} = props
  const searchForStock = useCallback(async() => {
    try{
      if(user){
        const token = await user.getIdToken();
       const response = await fetch(API_URL + 'stocks/search/stock/' + searchTerm, {
          method: 'GET',
          headers: {
            'Authorization' : 'Bearer ' + token
          }
        })
        const data = await response.json();
        if(data.message !== 'something went wrong'){
          setStocks(data);
          setSearchTerm('Stock added, please search again to find');
        }else if(data.message === 'something went wrong'){
          setSearchTerm('Invalid request');
        };
      };
    } catch(error){
      console.log(error)
    }
  }, [user, API_URL, searchTerm, setStocks, setSearchTerm])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredStocks = props.stocks.filter((stock) =>
      stock.name && stock.name.toLowerCase().includes(event.target.value.toLowerCase())
  );
    setFilteredStocks(filteredStocks);
  };

  const handleSearchUpdate = (event) => {
    event.preventDefault();
    const checkForStock = props.stocks.filter((s) => s.symbol === searchTerm.toUpperCase())
    console.log(checkForStock.length > 0)
    if(checkForStock.length <= 0){
      console.log('search')
      searchForStock();
    };
  };

  const loadStocks = () => {
    if (props.userStocks && props.userStocks.length > 0) {
    }
    if (searchTerm) {
      return filteredStocks && filteredStocks.map((stock,index) => (
          <div className="stocks" key={index}>
              <Link to={`/stocks/${stock.symbol}`} >
                  <p className="stock-name">{stock.name}</p>
              </Link>
              <p>${stock.price}</p>
          </div>
      ));
    } else {
      return props.stocks.map((stock,index) => (
          <div className="stocks" key={index}>
              <Link to={`/stocks/${stock.symbol}`}>
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
          <form onSubmit={handleSearchUpdate}>
            <input type="text" placeholder='Search Stocks' value={searchTerm} onChange={handleSearchTermChange} />
            <input type="submit" value='Search' />
          </form>
        </div>
        <section >{props.stocks ? loadStocks() : loadingStocks()}</section>
      </>
      ) : (
      <h2>Please Login to access stock info</h2>
      )}
    </>
  );
};

export default Index;