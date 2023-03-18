import { Link, useLocation } from 'react-router-dom';
import { loginWithGoogle, logout } from '../firebase';
import '../Css/nav.css'

const Nav = (props) => {
  const location = useLocation();

  return (
    <nav className="nav">
      <ul>
        {props.user ? (
          <>
            <Link to="/stocks">
              <div>Stock App</div>
            </Link>
            {(!props.user.photoURL) &&
            <li>Welcome, {props.user.displayName}</li>
            }
            {(props.user.photoURL) &&
            <>
            <li>Welcome, {props.user.displayName.split(' ', 1)}</li>
              <li>
              <img src={props.user.photoURL} alt={props.user.displayName} />
            </li>
            </>
            }
            <li>
              <Link to='/'>
                <button onClick={logout}>Logout</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            {(() => {
              if (location.pathname !== '/login' && location.pathname !== '/signup') {
                return (
                  <>
                    <Link to="/signin">
                      <button>Signin</button>
                    </Link>
                    <Link to="/signup">
                      <button>Sign up</button>
                    </Link>
                    <li>
                      <Link to="/stocks">
                        <button onClick={loginWithGoogle}>Login with Google</button>
                      </Link>
                    </li>
                  </>
                );
              }
            })()}
          </>
        )}

      </ul>
    </nav>
  );
};

export default Nav;
