import { Routes, Route} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';

const Main = (props) => {
        const [stocks, setStocks] = useState(null);
        const [filteredStocks, setFilteredStocks] = useState(null);
        const API_URL = "http://localhost:5000/stocks";



        const getStocks = useCallback(async () => {
            try {
                if (props.user) {
                    const token = await props.user.getIdToken();
                    const response = await fetch(API_URL, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });
                    const data = await response.json();
                    setStocks(data);
                    setFilteredStocks(data);
                }
            } catch (error) {
                console.error(error);
            };
        }, [props.user])

        const updateStockComment = async (stock, id) => {
            try {
                if (props.user) {
                    const token = await props.user.getIdToken();
                    await fetch(API_URL + '/' + id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'Application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify(stock),
                    });
                    getStocks();
                };
            } catch (error) {
                console.error(error);
            };
        };

        useEffect(() => {
            if(props.user){
                getStocks();
            }else{
                getStocks(null);
                setFilteredStocks(null);
            }
        }, [props.user,getStocks]);

        return(
            <main>
                <Routes>
                    < Route path='/stocks' element={<Index user={props.user} stocks={filteredStocks} setFilteredStocks={setFilteredStocks}/>}/>
                    < Route path='/stocks/:id' element={ < Show stocks={stocks} updateStockComment={updateStockComment}/>} />
                    < Route path='/login' element={<Login />}/>
                    < Route path='/signup' element={<SignUp/>}/>
                </Routes>
            </main>
        );
    };

                export default Main;