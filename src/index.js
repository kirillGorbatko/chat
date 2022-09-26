import App from './App';
import { createRoot } from 'react-dom/client';
import { createContext } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import './app.css';

firebase.initializeApp(
	{
		apiKey: "AIzaSyCgJ2JUIAA5xS3FEyd19KiG5K9kjgsioKU",
		authDomain: "chat-app-2cf44.firebaseapp.com",
		projectId: "chat-app-2cf44",
		storageBucket: "chat-app-2cf44.appspot.com",
		messagingSenderId: "466311520995",
		appId: "1:466311520995:web:2608ff6ee60fd00ff41bd6",
		measurementId: "G-STZSZ695JS"
	}
);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

const root = createRoot(document.getElementById('root'));
root.render(
	<Context.Provider
		value={{
			firebase,
			auth,
			firestore
		}}
	>
		<App />
	</Context.Provider>
);
