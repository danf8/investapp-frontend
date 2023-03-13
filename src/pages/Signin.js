import { Link } from 'react-router-dom';
import { login, signIn } from '../firebase';
import { useState } from 'react';

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const SignIn_URL = "http://localhost:5000/signin";

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      console.log("User signed in successfully");
      // Redirect the user here
      window.location.href = '/stocks';
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1>Sign In with Email Page</h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email: <input type="email" name="email" onChange={handleEmailChange} required/>
        </label><br/><br/>
        <label>
          Password: <input type="password" name="password" onChange={handlePasswordChange}/>
        </label><br/><br/>
        <div id='btnLi'>
          <input id='signinBtn' type='submit' value='signin'/>
          <Link to='/stocks'>
            <button onClick={login}>Login with Google</button>
          </Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </form>
    </>
  );
}

export default SignIn;
