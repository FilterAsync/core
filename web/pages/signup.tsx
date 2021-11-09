import Head from 'next/head';
import { useState } from 'react'
import { useFormik, Formik, Form } from 'formik';
import axios from 'axios';

export default function Signup() {
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

            <h1>Sign up page</h1>

            <Formik
                initialValues={{
                    name: '',
                    pass: '',
                    email: ''
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

                        <label
                            htmlFor="email"
                        >
                            E-mail:
                        </label>

                        <input

                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
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