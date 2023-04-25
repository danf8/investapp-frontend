import { Routes,Route} from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Index from '../pages/Index';
import Show from '../pages/Show';
import Signin from '../pages/Signin';
import SignUp from '../pages/Signup';
import Homepage from '../pages/Homepage';
import Form from '../pages/Form';
import UserStockData from '../pages/UserStockData';
import Dashboard from '../pages/Dashboard';

const Main = (props) => {
    const [stocks, setStocks] = useState(null);
    const [userStocks, setUserStocks] = useState(null);
    const [newBuyForm, setBuyForm] = useState({
        symbol: '',
        name: '',
        ownedShares: 0,
        price: '',
        currentPrice: 0,
    });

    const API_URL = "https://investing-app-1.herokuapp.com/";
    // const API_URL = "http://localhost:3002/";

    const openModal = () => {
        props.setModalOpen(true);
    };

    const closeModal = () => {
        props.setModalOpen(false);
    };

    const getStocks = useCallback(async () => {
        try {
            if(props.user) {
                const token = await props.user.getIdToken();
                const response = await fetch(API_URL + 'stocks', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
                const data = await response.json();
                setStocks(data);
            }
        } catch(error) {
    
        };
    }, [props.user]);

    const updateOwnedStocks = async (purchasedStock, id, urlString) => {
        try {
        if(props.user) {
        const token = await props.user.getIdToken();
                await fetch((API_URL + urlString + id), {
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3002',
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(purchasedStock),
                });
                getUserStocks();
            }
        } catch(error) {
        // console.log(error);
        }
    }
    const { user, setMongoUser } = props;
    const getUserStocks = useCallback(async () => {
        try {
        if(user) {
          const token = await user.getIdToken();
            const response = await fetch((API_URL + 'userstocks/' + user.uid), {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': 'Bearer ' + token
                },
            });
            const data = await response.json();
            setUserStocks(data);
            if(data){
                setMongoUser(true);
            };
        }
        } catch(error) {
        // console.log(error);
        }
    }, [user, setMongoUser]);

    const updateStockComment = async (stock, id) => {
        try {
            if(props.user) {
                const token = await props.user.getIdToken();
                await fetch(API_URL + 'stocks/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(stock),
                });
                getStocks();
            };
        } catch(error) {
            // console.error(error);
        };
    };

    const updateStockValues = useCallback(async () => {
        try{
            if(props.user) {
                const token = await props.user.getIdToken();
                await fetch(API_URL + 'stocks/update-prices',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
            }
        } catch(error) {
            // console.log(error);
        };
    }, [props.user]);

    const updateUserStockValues = useCallback(async () => {
        try{
            if (props.mongoUser){
                const token = await props.user.getIdToken();
               const response = await fetch(API_URL + 'user/update/' + props.user.uid, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization': 'Bearer ' + token
                    },
                });
                const data = await response.json()
                if(data){
                    setUserStocks(data);

                }
            }
        } catch(error) {
            // console.log(error)
        }
    }, [props.user, props.mongoUser]);


    useEffect(() => {
            setInterval(() => {
            const time = new Date();
            const utcTime = time.getUTCHours();
            const estTime = (utcTime - 4);
            if(estTime === 16) {
                updateStockValues();
            }
        }, 1000* 60 * 60);
        
        if(props.mongoUser){
            updateUserStockValues();
        }
        if(props.user) {
            getStocks();
            getUserStocks();
        }else{
            getStocks(null);
        }
    }, [props.user, props.mongoUser, getStocks, updateStockValues, getUserStocks,updateUserStockValues]);

    return(
        <main>
            <Routes>
                <Route path='/' element={<Homepage user={props.user} API_URL={API_URL}/>}/>
                <Route path='/stocks' element={<Index user={props.user} stocks={stocks} openModal={openModal} closeModal={closeModal} updateUserStockValues={updateUserStockValues} userStocks={userStocks} API_URL={API_URL} setStocks={setStocks}/>}/>
                <Route path='/stocks/:id' element={ <Show closeModal={closeModal}
                                                            openModal={openModal}
                                                            modalOpen={props.modalOpen}
                                                            setModalOpen={props.setModalOpen}
                                                            stocks={stocks}
                                                            updateStockComment={updateStockComment}
                                                            updateOwnedStocks={updateOwnedStocks}
                                                            user={props.user}
                                                            newBuyForm={newBuyForm}
                                                            setBuyForm={setBuyForm}
                                                            userStocks={userStocks}
                                                            />}/>
                <Route path='/signin' element={<Signin user={props.user}/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/form' element={<Form user={props.user}
                                                    API_URL={API_URL}
                                                    userStocks={userStocks}
                                                    getStocks={getStocks}
                                                    getUserStocks={getUserStocks}
                                                    mongoUser={props.mongoUser}
                                                    setMongoUser={props.setMongoUser}
                                                    />}/>
                <Route path='/userStocks/:id' element={<UserStockData user={props.user}
                                                                        userStocks={userStocks}
                                                                        stocks={stocks}/>}/>
                <Route path='/user/dashboard/:id' element={<Dashboard user={props.user} userStocks={userStocks} stocks={stocks}/>}/>
            </Routes>
        </main>
    );
    };

export default Main;