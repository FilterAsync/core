import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { verifyUser } from '../modules/verifyUser';
export default function Dashboard() {
    const [status, setStatus] = useState<undefined | number>(undefined);

    useEffect(() => {
        verifyUser()
            .then((res) => {
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