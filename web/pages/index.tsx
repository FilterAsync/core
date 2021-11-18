import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Core</title>
            </Head>

            <h1>Home page</h1>
            <Link href="/signup">
                <a>Sign up</a>
            </Link>
            <Link href="/login">
                <a>Log in</a>
            </Link>
        </>
    );
}
