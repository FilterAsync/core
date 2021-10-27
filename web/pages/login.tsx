import Head from 'next/head';
import axios from 'axios';
import { useFormik, Formik, Form } from 'formik';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();

    async function submitData(name: string, pass: string) {
        await fetch('http://127.0.0.1:8082/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        router.push('/dashboard');

        /*
        await axios.post('http://127.0.0.1:8082/api/login', {
            credentials: 'include',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });
        */
    };

    return (
        <>
            <Head>
                <title>Core - Log In</title>
            </Head>

            <h1>Log in page</h1>

            <Formik
                initialValues={{
                    name: '',
                    pass: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    submitData(values.name, values.pass);
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
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>

                        <label
                            htmlFor="name"
                        >
                            Username:
                        </label>

                        <input

                            type="name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />

                        <label
                            htmlFor="pass"
                        >
                            Password:
                        </label>

                        <input
                            type="password"
                            name="pass"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.pass}

                        />

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </form>

                )}

            </Formik>
        </>
    )
}