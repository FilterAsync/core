import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { verifyUser } from '../modules/verifyUser';
import io from 'socket.io-client';
import { Formik } from 'formik';

const URL = 'http://localhost:8081/';

const socket = io(URL, { autoConnect: false });

const Dashboard = () => {
	const [senders, setSenders] = useState([]);
	const [name, setName] = useState('');
	const [dms, setDms] = useState(false);
	const [clientId, setClientId] = useState('');
	const [usernameAlreadySelected, setUsernameAlreadySelected] = useState(false);

	useEffect(() => {
		socket.on('connected', (id) => {
			setClientId(id);
		});

		socket.on('servermessage', (data) => {
			if (
				socket.id != data.id &&
				socket.id == data.packet.values.receiver // if the user's id matches the id the receiver put and if the user isn't receiving his own message
			) {
				setSenders([data.id]);
				console.log(senders);
			}
		});

		socket.on('connect_error', (err) => {
			if (err.message === 'invalid username') {
				setUsernameAlreadySelected(false);
			}
		});
	}, []);

	const router = useRouter();

	useEffect(() => {
		verifyUser().then((res) => {
			if (res.status != 200) {
				router.push('/login');
			}
		});
	});

	return (
		<>
			<Head>
				<title>Core - Dashboard</title>
			</Head>
			<h1>Dashboard</h1>

			<Formik
				initialValues={{
					name: '',
				}}
				onSubmit={(values, { setSubmitting }) => {
					socket.auth = { name: values.name };
					console.log('Authenticated');
					socket.connect();
					console.log('Socket connected');
					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={(e) => handleSubmit(e)}>
						<label htmlFor="name">Name:</label>

						<input
							type="name"
							name="name"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</form>
				)}
			</Formik>

			{name && (
				<button
					onClick={() => {
						setDms(dms === false ? true : false);
						console.log(dms);
					}}
				>
					DMs
				</button>
			)}

			{!dms && name && (
				<>
					<h1>Send Message</h1>
					<Formik
						initialValues={{
							receiver: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							console.log('New connection started');
							socket.emit('messagepacket', { values });
							setSubmitting(false);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={(e) => handleSubmit(e)}>
								<label htmlFor="receiver">New conversation:</label>

								<input
									type="receiver"
									name="receiver"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.receiver}
								/>

								<button type="submit" disabled={isSubmitting}>
									Submit
								</button>
							</form>
						)}
					</Formik>
					<h1>Message</h1>
					<h1>Your ID: {clientId}</h1>

					<h1>Direct messages</h1>
				</>
			)}
		</>
	);
};

export default Dashboard;
