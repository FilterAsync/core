import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [status, setStatus] = useState<undefined | number>(undefined);


    useEffect(() => {
        (async () => {
            return fetch('http://127.0.0.1:8082/api/verify', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        })().then((res) => {
            if (res.status === 200) {
                setStatus(200);
            } else {
                setStatus(401);
            };
        });
    }, [])

    return (

        <>
            <Head>
                <title>Core - Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
            <h2>{status}</h2>
        </>
    )
}