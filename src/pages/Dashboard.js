// import { Link } from 'react-router-dom';

// const Dashboard = (props) => {
//     console.log("-----top" + props.userIndexState)
    
//     const loadOwnedStocks = async() => {
//         if(props.user.userIndexState) {
//             return props.user.userIndexState.ownedStocks.map(async(stocks, index) => {
//                 return stocks.map((stock, index) => {
//                 return (
//                   <div key={stock.stockToBuy._id}>
//                     <Link to={`/stocks/${stock.stockToBuy._id}`}>
//                     <p className="stock-name">{stock.stockToBuy.name}</p>
//                     </Link>
//                   </div>
//                  )
//                 })
//             })
        
//         // for(let i = 0; i < props.user.userIndexState.ownedStocks.length; i++){
//         //     const ownedStock = props.user.userIndexState.ownedStocks[i][i];
//         //     console.log("Name: "+ ownedStock[i][i].stockToBuy.name)
//         //     console.log("Length: "+ ownedStock.length)
//         //     return (
//         //               <div key={ownedStock[i][i].stockToBuy._id}>
//         //                 <Link to={`/stocks/${ownedStock[i][i].stockToBuy._id}`}>
//         //                 <p className="stock-name">{ownedStock[i][i].stockToBuy.name}</p>
//         //                 </Link>
//         //               </div>
//         //     )
//         // }
//         }else{
//             <h1>You don't own any stocks.</h1>
//         }
//     }
    
//     console.log("-----outside" + props.userIndexState)

//     const loadingOwnedStocks = () => {
//         return <h1>Loading Your Stocks....</h1>;
//     };

//     return (
//         <>
//         {props.user ? (
//             <div className='Dashboard'>
//             Owned Stocks:
//             <section>{props.user.userIndexState ? loadOwnedStocks() : loadingOwnedStocks()}</section>
//             Total Value: 
//             </div>
//              ) : (
//             <h2>Please Login to access stock info</h2>
//         )}
//         </>
//     );
// };

// export default Dashboard;
