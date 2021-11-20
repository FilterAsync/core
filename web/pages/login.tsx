import Head from 'next/head';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import {
	FormLabel,
	FormControl,
	Button,
	Card,
	FormGroup,
	Container,
} from 'react-bootstrap';
import { NextPage } from 'next';

const Login: NextPage = ({}) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Core - Login</title>
			</Head>
			<Container>
				<Card>
					<Card.Body>
						<Card.Title as="h2">Login</Card.Title>
						<Formik
							initialValues={{
								name: '',
								pass: '',
							}}
							onSubmit={async (values, { setSubmitting }) => {
								const res = await fetch('http://localhost:8080/api/login', {
									method: 'POST',
									credentials: 'include',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify(values),
								});
								if (res.status == 200) {
									setSubmitting(false);
									router.push('/dashboard');
									console.log('Data submitted!');
								}
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

export default Login;
