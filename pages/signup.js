import Head from 'next/head';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Core - Sign Up</title>
            </Head>

            <h1>Sign up page</h1>
            <form>
                <label>Name:</label>
                <input type="text" id="name" name="name"></input>
                <label>Password:</label>
                <input type="password" id="pass" name="pass"></input>
                <label>Email:</label>
                <input type="email" id="email" name="email"></input>
            </form>
        </>
    )
}