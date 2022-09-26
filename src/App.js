import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from './index';

import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

const App = () => {
	const { auth } = useContext(Context);
	const [user, loading] = useAuthState(auth);

	if (loading) return <Loader />

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	);
};

export default App;