import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';

const Index: NextPage = ({}) => {
	return (
		<>
			<Head>
				<title>Core</title>
			</Head>
			<h1>Home page</h1>
			<ul>
				<li>
					<Link href="/signup">
						<a>Sign up</a>
					</Link>
				</li>
				<li>
					<Link href="/login">
						<a>Log in</a>
					</Link>
				</li>
			</ul>
		</>
	);
};
export default Index;
