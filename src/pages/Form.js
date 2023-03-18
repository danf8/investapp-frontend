import { useState } from 'react';

const Form = (props) => {
    const [newUser, setNewUser] = useState(false);
    const [notNewUser, setNotNewUser] = useState(false);

    const handleNewUserChange = (event) => {
        setNewUser(event.target.checked);
      };
    
    const handleNotNewUserChange = (event) => {
        setNotNewUser(event.target.checked);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(newUser){
                //redirect new user here
                window.location.href = '/users';
                }else if(notNewUser){
                // Redirect registered user here
                window.location.href = '/stocks';
                }else{
                alert('You must select an option to continue.')
                }
   };

    return(
        <form onSubmit={handleSubmit}>
            <label>
             <h1>Is this your first time logging onto this website?</h1>
             This is my first time logging onto this website: 
             <input type="checkbox" name="newUser" checked={newUser} onChange={handleNewUserChange}></input>
            </label><br/><br/>
            <label>
             This is NOT my first time logging onto this website:
             <input type="checkbox" name="notNewUser" checked={notNewUser} onChange={handleNotNewUserChange}></input>   
            </label><br/><br/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;