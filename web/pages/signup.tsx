import Head from 'next/head';
import { Formik, Form } from 'formik';
import axios from 'axios';
import {
	Button,
	Card,
	Container,
	FormControl,
	FormGroup,
	FormLabel,
} from 'react-bootstrap';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
	async function submitData(name: string, pass: string, email: string) {
		await axios.post('http://127.0.0.1:8080/api/signup', {
			name,
			pass,
			email,
		});

		console.log('Data submitted!');
	}

	return (
		<>
			<Head>
				<title>Core - Sign Up</title>
			</Head>
			<Container>
				<Card>
					<Card.Body>
						<Card.Title as="h2">Register</Card.Title>
						<Formik
							initialValues={{
								name: '',
								pass: '',
								email: '',
							}}
							onSubmit={(values, { setSubmitting }) => {
								submitData(values.name, values.pass, values.email);
								console.log('Data submitted!');
								setSubmitting(false);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								isSubmitting,
							}) => (
								<Form>
									<FormGroup className="mb-4">
										<FormLabel htmlFor="name">Username:</FormLabel>
										<FormControl
											type="name"
											name="name"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
										/>
									</FormGroup>
									<FormGroup className="mb-4">
										<FormLabel htmlFor="pass">Password:</FormLabel>
										<FormControl
											type="password"
											name="pass"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.pass}
										/>
									</FormGroup>
									<FormGroup className="mb-4">
										<FormLabel htmlFor="email">E-mail:</FormLabel>
										<FormControl
											type="email"
											name="email"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
										/>
									</FormGroup>
									<Button type="submit" disabled={isSubmitting}>
										Submit
									</Button>
								</Form>
							)}
						</Formik>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default SignUp;
