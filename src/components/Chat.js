import React, { useContext, useState } from 'react';

import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Loader from './Loader';

const Chat = () => {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('createdAt')
	);

	const sendMessage = async () => {
		firestore.collection('messages').add({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		});
		setValue('');
	}

	const convertSeconds = (s) => {
		const num = (val) => {
			val = Math.floor(val);
			return val < 10 ? '0' + val : val;
		};

		const hours = s / 3600 % 24;
		const minutes = s / 60 % 60;
		const seconds = s % 60;

		return num(hours) + ":" + num(minutes) + ":" + num(seconds);
	}

	if (loading) return <Loader />

	return (
		<section className='section chat'>
			<div className='chat__in'>
				<ul className='chat_window'>
					{messages.map(message =>
						// {const liClass = `chat_window__item ${message}`}
						<li
							key={message.createdAt}
							className={
								user.uid === message.uid ?
									'chat_window__item chat_window__item--mod_1'
									:
									'chat_window__item chat_window__item--mod_2'
							}
						>
							<div className='chat_window__wrap'>
								<img src={message.photoURL} className='chat_window__img' alt="user avatar" />
								<div className='chat_window__name'>{message.displayName}</div>
							</div>
							<div className='chat_window__message'>
								<div className='chat_window__text'>{message.text}</div>
								<div className='chat_window__time'>{convertSeconds(message.createdAt)}</div>
							</div>
						</li>
					)}
				</ul>
				<div className='chat_bottom'>
					<textarea
						value={value}
						onChange={e => setValue(e.target.value)}
						className="chat_bottom__textarea"
						placeholder='Type your message...'
					/>
					<button
						onClick={sendMessage}
						className='chat_bottom__button'
						type='button'
					>Send</button>
				</div>
			</div>
		</section>
	);
};

export default Chat;