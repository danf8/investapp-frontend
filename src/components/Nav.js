import {Link } from 'react-router-dom';

const Nav = (props) => {
    return (
        <nav>
            <Link to='/stocks'>
                <div>Stock App</div>
            </Link>
        </nav>
    );
};

export default Nav;