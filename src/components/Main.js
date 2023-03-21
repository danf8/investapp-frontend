import { Routes, Route} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Signin from '../pages/Signin';
import SignUp from '../pages/Signup';
import Homepage from '../pages/Homepage';
import Form from '../pages/Form';
// import Dashboard from '../pages/Dashboard';

const Main = (props) => {
    const [stocks, setStocks] = useState(null);
    const [userIndexState, setUserIndexState] = useState(null);
    const API_URL = "http://localhost:3002/stocks";

    const getUserStocks = useCallback(async () => {
        try {
            if (props.user) {
                // console.log("Logging the user :" + JSON.stringify(props.user));
                const token = await props.user.getIdToken();
                const response = await fetch(`${API_URL}/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                const data = await response.json();
                console.log(data)
                setUserIndexState(data);
            }
        } catch (error) {
            console.error(error);
        };
    }, [props.user]);
    // console.log("New state: " + JSON.stringify(userIndexState))
    console.log(userIndexState)

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
            }
        } catch (error) {
            console.error(error);
        };
    }, [props.user]);

    const updateOwnedStocks = async (purchasedStock, id) => {
        try {
        if (props.user) {
        console.log(props.user)
        const token = await props.user.getIdToken();
        // console.log(token)
                await fetch(('http://localhost:3002/users/' + id), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(purchasedStock),
                })
            }
        } catch (error) {
        console.log(error);
        }
    }

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

    const updateStockValues = useCallback(async () => {
        try{
            if (props.user) {
                const token = await props.user.getIdToken();
                await fetch(API_URL + '/update-prices',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
            }
        } catch (error) {
            console.log(error);
        };
    }, [props.user]);

        useEffect(() => {
                setInterval(() => {
                const time = new Date();
                const utcTime = time.getUTCHours();
                const estTime = (utcTime - 5);
                if(estTime === 16) {
                    updateStockValues()
                }
            }, 1000* 60 * 60);
            if(props.user){
                getStocks();
                getUserStocks()
            }else{
                getStocks(null);
                getUserStocks(null)
            }
        }, [props.user,getStocks, updateStockValues, getUserStocks ]);

        return(
            <main>
                <Routes>
                    < Route path='/' element={<Homepage user={props.user}/>} />
                    < Route path='/stocks' element={<Index user={props.user} stocks={stocks} />}/>
                    < Route path='/stocks/:id' element={ < Show stocks={stocks} updateStockComment={updateStockComment} updateOwnedStocks={updateOwnedStocks} user={props.user}/>} />
                    < Route path='/signin' element={<Signin user={props.user}/>}/>
                    < Route path='/signup' element={<SignUp/>}/>
                    < Route path='/form' element={<Form user={props.user}/>}/>
                    {/* <Route path='/dashboard' element={<Dashboard user={props.user} stocks={stocks} userIndexState={userIndexState} />} /> */}
                </Routes>
            </main>
        );
    };

export default Main;