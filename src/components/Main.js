import {Routes, Route} from 'react-router-dom';
import {useEffect, useState, useRef} from 'react';
import Index from '../pages/Index';
import Show from '../pages/Show';

const Main = (props) => {
    const [stocks, setStocks ] = useState(null);
    const API_URL = "http://localhost:3001/stocks";

    const getStocks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setStocks(data);
        } catch (error) {
            //used for error handling
        };
    };
    
    const updateStockComment = async (stock, id) => {
        
        await fetch(API_URL + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(stock),
        });
        getStocks();
    };

    const getStockRef = useRef();

    useEffect(() => {
        getStockRef.current = getStocks;
    });

    useEffect(() => {
        getStocks();
    }, []);

    return(
        <main>
            <Routes>
                < Route path='/stocks' element={<Index stocks={stocks} />}/>
                < Route path='/stocks/:id' element={ < Show stocks={stocks} updateStockComment={updateStockComment}/>} />
            </Routes>
        </main>
    );
};

export default Main;