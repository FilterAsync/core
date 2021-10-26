import Head from 'next/head';
import { useState } from 'React';
import axios from 'axios';

export default function Dashboard() {
    const res = (async function foo() {
        return await fetch('http://127.0.0.1:8082/api/verify', {
            method: 'POST',
            credentials: 'include'
        });
    })();

    return (
        <>
            <Head>
                <title>Core - Dashboard</title>
            </Head>
            <h1>Dashboard</h1>
        </>
    )
}