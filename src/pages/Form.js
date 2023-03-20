// import { useState } from 'react';

const Form = (props) => {
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
      window.location.href = '/stocks';
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
        await fetch('http://localhost:3002/users', {
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
    <form onSubmit={handleSubmit}>
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
      <button type="submit">continue to the your home page</button>
    </form>
  );
}

export default Form;
