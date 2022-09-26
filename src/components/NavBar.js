import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const NavBar = () => {
	const { auth } = useContext(Context);
	const [user] = useAuthState(auth);

	return (
		<nav className='navbar'>
			<div className='navbar__wrapper'>
				{user ?
					<button onClick={() => auth.signOut()} type='button'>Logout</button>
					:
					<NavLink to={LOGIN_ROUTE}>
						<button type='button'>Login</button>
					</NavLink>
				}
			</div>
		</nav>
	);
};

export default NavBar;