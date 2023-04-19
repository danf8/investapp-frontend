import { useState } from 'react';
import '../css/form.css'
import { useNavigate } from 'react-router-dom';

  const Form = (props) => {
  const navigate = useNavigate();

  const [startValue, setStartValue] = useState({
    ownedStocks: [],
    currentMoney: 0,
  })

  const handleFormChange = (event) => {
    setStartValue((prevState) => ({
      ...prevState,
       ownedStocks: [],
      [event.target.name]: parseInt([event.target.value]),
    }));
  };
        
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateNewUser(startValue);
    navigate('/stocks', {replace: true});
  };

  // used to set users current money on db
  const updateNewUser = async(currentMoney) => {
    try {
      if (props.user) {
        const token = await props.user.getIdToken();
        await fetch(props.API_URL +  'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(currentMoney) 
        });
      }
    } catch(error) {
      // console.error(error);
    }
  };

  if(!props.userStocks) {
  return (
    <form id='Form' onSubmit={handleSubmit}>
      <label>Please enter your starting amount of money: $<input type="number" name="currentMoney" value={startValue.currentMoney} onChange={handleFormChange} id="" /></label>
      <button id='Formbtn' type="submit">Start Learning Now!</button>
    </form>
  );
  } else {
    return (
      <div>
        <h1>Welcome back, {props.user.displayName} </h1>
        <h3>Your last login was on: {props.user.metadata.lastSignInTime}</h3>
      </div>
    )
  };
};


export default Form;



