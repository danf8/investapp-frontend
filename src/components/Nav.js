import { Link, useLocation } from 'react-router-dom';
import { login, logout } from '../firebase';

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

            <li>Welcome, {props.user.displayName.split(' ', 1)}</li>
            <li>
              <img src={props.user.photoURL} alt={props.user.displayName} />
            </li>
            <li>
                <button onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            {(() => {
              if (location.pathname !== '/login' && location.pathname !== '/signup') {
                return (
                  <>
                    <Link to="/login">
                      <button>Login</button>
                    </Link>
                    <Link to="/signup">
                      <button>Sign up</button>
                    </Link>
                    <li>
                      <Link to="/stocks">
                        <button onClick={login}>Login with Google</button>
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
