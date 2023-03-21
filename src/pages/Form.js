// import { useState } from 'react';
import '../Css/Form.css'
import { useNavigate } from 'react-router-dom';

  const Form = (props) => {
  const navigate = useNavigate();
  
    // const [newUser, setNewUser] = useState(false);
    // const [notNewUser, setNotNewUser] = useState(false);

    // const handleNewUserChange = (event) => {
      //   setNewUser(event.target.checked);
      // };
      
      // const handleNotNewUserChange = (event) => {
        //   setNotNewUser(event.target.checked);
        // };
        
        const handleSubmit = async (event) => {
          event.preventDefault();
          // if(newUser) {
            //redirect new user here
      await updateNewUser([], 100000, props.user.uid);
      // window.location.href = '/stocks';
      navigate('/stocks', {replace: true});
      // } else if(notNewUser) {
        // Redirect registered user here
        // window.location.href = '/stocks';
        // } else {
          //   alert('You must select an option to continue.')
          // }
        };

        const updateNewUser = async(ownedStocks, currentMoney, uid) => {
          try {
            if (props.user) {
              const token = await props.user.getIdToken();
        // await fetch('http://localhost:5000/users', {
        await fetch('https://investing-buddy.herokuapp.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ownedStocks, currentMoney, uid}) // empty object for now
        })
        .catch((error) => {
          console.error(error);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <form id='Form' onSubmit={handleSubmit}>
      {/* <label>
        <h1>Is this your first time logging onto this website?</h1>
        This is my first time logging onto this website:
        <input type="checkbox" name="newUser" checked={newUser} onChange={handleNewUserChange}></input>
      </label><br/><br/>
      <label>
        This is NOT my first time logging onto this website:
        <input type="checkbox" name="notNewUser" checked={notNewUser} onChange={handleNotNewUserChange}></input>
      </label><br/><br/> */}
      {/* <h1>Click here to continue</h1> */}
      <button id='Formbtn' type="submit">Start Learning Now!</button>
    </form>
  );
}

export default Form;
