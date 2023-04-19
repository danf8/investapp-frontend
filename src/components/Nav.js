import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle, logout } from '../firebase';
import '../css/nav.css';

const Nav = (props) => {
  const navigate = useNavigate();

  const handleLogin = async()=>{
    await loginWithGoogle();
    navigate('/form');
  };

  const handleLogout = async()=>{
    await logout();
    navigate('/');
  };

  return (
    <nav className='nav'>
      <ul>
        {props.user ? (
          <>
            <Link id='home' to="/stocks">
              <button>Home</button>
            </Link>
            <Link id='myinvestment' to={"/userStocks/" + props.user.uid}>
              <button>My Investments</button>
            </Link>
            <Link id='myinvestment' to={"/dashboard/" + props.user.uid}>
              <button>My Dashboard</button>
            </Link>
            {(!props.user.photoURL) &&
            <li id='welcome'>Welcome, {props.user.displayName}</li>
            }
            {(props.user.photoURL) &&
            <>
            <li id='welcome'>Welcome, {props.user.displayName.split(' ', 1)}</li>
              <li>
              <img src={props.user.photoURL} alt={props.user.displayName} />
            </li>
            </>
            }
            <li>
              <Link to='/'>
                <button onClick={handleLogout}>Logout</button>
              </Link>
            </li>
          </>
        ) : ( 
          <>
            <ul>
            <Link to='/signin'>
              <button>Sign in</button>
            </Link>
            <Link to='/signup'>
              <button>Sign up</button>
            </Link>
            <Link to='/stocks'>
              <button onClick={handleLogin}>Login with Google</button>
            </Link>
              </ul>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
