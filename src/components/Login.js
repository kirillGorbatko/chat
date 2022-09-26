import React, { useContext } from 'react';
import { Context } from '../index';

import firebase from 'firebase/compat/app';

const Login = () => {
	const { auth } = useContext(Context);

	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const { user } = await auth.signInWithPopup(provider);
	};

	return (
		<section className='section login'>
			<div className='login__in'>
				<button onClick={login} type='button'>Login with Google</button>
			</div>
		</section>
	);
};

export default Login;