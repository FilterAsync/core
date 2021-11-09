import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { verifyUser } from '../modules/verifyUser';
import io from 'socket.io-client';
import axios from 'axios';
import { Formik } from 'formik';
import { FormEvent } from 'react'

const ws = io('http://127.0.0.1:8081/');

export default function Dashboard() {
    const [sender, setSender] = useState('');
    const [message, setMessage] = useState('');
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        ws.on('connected', (id) => {
            setClientId(id);
        });

        ws.on('servermessage', (data) => {
            if (ws.id != data.id && ws.id == data.packet.values.receiver) {
                setSender(data.id);
                setMessage(data.packet.values.message);
            };
        });
    }, []);

    const router = useRouter();

    useEffect(() => {
        verifyUser()
            .then((res) => {
                if (res.status != 200) {
                    router.push('/login');
                }
            })
    });

    return (

        <>
            <Head>
                <title>Core - Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
            <h1>Send Message</h1>

            <Formik
                initialValues={{
                    receiver: '',
                    message: ''
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Data submitted');
                    ws.emit('messagepacket', { values });
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

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>

                    </form>

                )}

            </Formik>
            <h1>Message</h1>
            <p>Received from: {sender}</p>
            <h3>Message: {message}</h3>
            <h1>Your ID: {clientId}</h1>
        </>
    )

}