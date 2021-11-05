import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { verifyUser } from '../modules/verifyUser';
import io from 'socket.io-client';
import axios from 'axios';

export default function Dashboard() {

    const router = useRouter();

    const [status, setStatus] = useState<undefined | number>(undefined);
    useEffect(() => {
        verifyUser()
            .then((res) => {
                if (res.status != 200) {
                    router.push('/login');
                }
            })
    })
    return (
        <>
            <button onClick={async () => {
                await fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    credentials: 'include',
                });
            }}>POST</button>
            <button onClick={async () => {
                await fetch('http://localhost:8080/api/verify', {
                    method: 'GET',
                    credentials: 'include',
                });
            }}>GET</button>
            <h1>{status}</h1>
        </>
    )
    //
    // return (

    //     <>
    //         <Head>
    //             <title>Core - Dashboard</title>
    //         </Head>
    //         <h1>Dashboard</h1>
    //         <h2>{status}</h2>

    //         <Formik
    //             initialValues={{
    //                 message: '',
    //                 receiver: ''
    //             }}
    //             onSubmit={(values, { setSubmitting }) => {
    //                 submitMessage(values.message, values.receiver);
    //                 console.log('Message submitted!');
    //                 setSubmitting(false);
    //             }}
    //         >

    //             {({
    //                 values,
    //                 errors,
    //                 touched,
    //                 handleChange,
    //                 handleBlur,
    //                 handleSubmit,
    //                 isSubmitting,
    //             }) => (
    //                 <form onSubmit={handleSubmit}>

    //                     <label
    //                         htmlFor="message"
    //                     >
    //                         Message:
    //                     </label>

    //                     <input

    //                         type="message"
    //                         name="message"
    //                         onChange={handleChange}
    //                         onBlur={handleBlur}
    //                         value={values.message}
    //                     />

    //                     <label
    //                         htmlFor="receiver"
    //                     >
    //                         Receiver:
    //                     </label>

    //                     <input

    //                         type="receiver"
    //                         name="receiver"
    //                         onChange={handleChange}
    //                         onBlur={handleBlur}
    //                         value={values.receiver}
    //                     />

    //                     <button type="submit" disabled={isSubmitting}>
    //                         Submit
    //                     </button>

    //                 </form>

    //             )}

    //         </Formik>
    //     </>
    // )
    //
}