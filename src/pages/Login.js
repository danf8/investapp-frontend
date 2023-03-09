import {Link } from 'react-router-dom';
import {login} from '../firebase';

function Login(props){
    return (
    <>
    <h1>Login Page</h1>
    <form action='/login' method='POST' autocomplete='off'>
        <label>
            Email: <input type="email" name="email" required/>
        </label><br/><br/>
        <label>
            Password: <input type="password" name="password"/>
        </label><br/><br/>
        <div id='btnLi'>
            <input id='loginBtn' type='submit' value='login'/>
            <Link to='/stocks'>
            <button onClick={login}>Login with Google</button>
           </Link>
            <a id='signupUrl' href='/signup'>Sign Up</a>
        </div>
    </form>
    </>
    );
};

export default Login;