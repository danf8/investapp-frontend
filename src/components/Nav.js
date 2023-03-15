import {Link } from 'react-router-dom';
import {login, logout} from '../firebase';

const Nav = (props) => {
    return (
        <nav className="nav">
            <Link to='/stocks'>
                <div>Stock App</div>
            </Link>

        <ul>
        {props.user ?
        <>
        <li>Welcome, {props.user.displayName.split(' ', 1)}</li>
        <li>
          <img src={props.user.photoURL} alt={props.user.displayName} />
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
        </>
        :
        <li>
          <button onClick={login}>Login</button>
        </li>
        }
      </ul>
        </nav>
    );
};

export default Nav;