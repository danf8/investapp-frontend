import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle, signIn } from '../firebase';
import { useState } from 'react';
import '../css/signin.css';

function SignIn(props) {
  // commeneted out sections to allow users to use app without signing up.
  // set state to allow users to use app without signing up.
  const [email, setEmail] = useState('user1@email.com');
  const [password, setPassword] = useState('1234567');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
      navigate('/form', {replace: true});
    } catch (error) {

    }
  };

  const handleEmailChange = (event) => {
    // setEmail('user1@email.com');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    // setPassword('1234567');
    setPassword(event.target.value);
  };

  return (
    <div className='signin-form'>
      {/* <h1>Sign In with Email</h1><br/><br/> */}
      <h1>Click Below to Enter</h1>
      <form onSubmit={handleSignIn}>
        <label>
          {/* <input type="email" name="email" value='Email'  onChange={handleEmailChange} required/> */}
          <input type="email" name="email" placeholder='Email' hidden onChange={handleEmailChange} />
        </label><br/><br/>
        <label>
          {/* <input type="password" name="password" value='Password'  onChange={handlePasswordChange}/> */}
          <input type="password" name="password" placeholder='Password' hidden onChange={handlePasswordChange}/>
        </label><br/><br/>
        <div id='btnLi'>
          <input id='signinBtn' type='submit' value='Click here to use test account'/>
          {/* <input id='signinBtn' type='submit' value='Sign In'/> */}
          <Link id='signUpBtn' to='/signup'>Sign Up</Link>
          <small id='sSI'>or you can sign in with</small>
          <Link to='/signin'>
            <button id='GoogleSI' onClick={loginWithGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg>
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
