import Head from 'next/head';
import { useState } from 'react'
import { useFormik, Formik, Form } from 'formik';
import axios from 'axios';

export default function Signup() {

    function submitData() {
        axios.post('127.0.0.1:4000/api/signup', {

        })
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
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ isSubmitting }) => {
                    // somewhere where no one would look inside to make it secret
                    // ?
                    // ok
                    // can i try to rebuild with hooks
                    // um are u stil here yes
                    // where is it
                    // ok
                    // do Ctrl-P then search for it
                    // i'm in InputField.js
                    // ok u can rewrite this thing
                    // kk
                    return <Form autoComplete="on" noValidate>
                        <label>Name:</label>
                        <input type="text" id="name" name="name" ></input>
                        <label>Password:</label>
                        <input type="password" id="pass" name="pass" ></input>
                        <label>Email:</label>
                        <input type="email" id="email" name="email" ></input>
                        <button type="submit" disabled={isSubmitting}>Submit</button>
                    </Form>
                }}
            </Formik>
        </>
    )
}