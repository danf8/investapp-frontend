import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle, signUp, profileUpdate} from '../firebase';
import '../Css/signup.css'

function SignUp(props){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (event) => {
      event.preventDefault();
      try {
        await signUp(email, password);
        profileUpdate(displayName);
        navigate('/form', {replace: true});
      } catch (error) {
        console.error(error);
      }
    };

    const handleNameChange = (event) => {
      setDisplayName(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    return (
      <div className="signup-form">
        <h1>Sign Up</h1><br/><br/>
        <form onSubmit={handleSignup}>
            <label>
                <input type="text" placeholder='Display Name' name="displayName" value={displayName} onChange={handleNameChange} required/>
            </label><br/><br/>
            <label>
                <input type="email" name="email" placeholder='Email' value={email} onChange={handleEmailChange} required/>
            </label><br/><br/>
            <label>
                <input type="password" placeholder='Password' name="password" value={password} onChange={handlePasswordChange} required/><br/>
            <small>Password must be longer than 6</small>
            </label><br/><br/>
            <input id="SignupBtn" type="submit" value="Sign Up"/><br/><br/>
            <small>Have an account?</small>
            <Link id="siwe" to="/signin">Sign in with email</Link><br/><br/>
            <small id="sSU">or you can sign in with</small>
            <Link to='/signin'>
            <button id="GoogleSU" onClick={loginWithGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg>
            </button>
            </Link>
        </form><br/><br/>
      </div>
    );
  };

export default SignUp;