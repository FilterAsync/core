import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { verifyUser } from '../modules/verifyUser';
import io from 'socket.io-client';

export default function Dashboard() {
    const ws = io('http://localhost:8081');

    ws.on('message', () => {
        console.log('Message received');
    });

    const router = useRouter();

    const [status, setStatus] = useState<undefined | number>(undefined);

    useEffect(() => {
        verifyUser()
            .then((res) => {
                if (res.status === 200) {
                    setStatus(200);
                } else {
                    setStatus(401);
                    router.push('/login');
                };
            });
    }, []);

    async function submitMessage(message: string, receiver: string) {
        await fetch('http://127.0.0.1:8080/api/message', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                receiver
            })
        });
        return ws.send('Hello');
    };

    return (

        <>
            <Head>
                <title>Core - Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
            <h2>{status}</h2>

            <Formik
                initialValues={{
                    message: '',
                    receiver: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    submitMessage(values.message, values.receiver);
                    console.log('Message submitted!');
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
                            htmlFor="message"
                        >
                            Message:
                        </label>

                        <input

                            type="message"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                        />

                        <label
                            htmlFor="receiver"
                        >
                            Receiver:
                        </label>

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
        </>
    )
}