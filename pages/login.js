import Head from 'next/head';

export default function Login() {
    return (
        <>
            <Head>
                <title>Core - Log In</title>
            </Head>

            <h1>Log in page</h1>
            <form>
                <label>Name:</label>
                <input type="text" id="name" name="name"></input>
                <label>Password:</label>
                <input type="password" id="pass" name="pass"></input>
            </form>
        </>
    )
}