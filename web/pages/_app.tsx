import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			require('bootstrap/dist/js/bootstrap');
		}
	});
	return <Component {...pageProps} />;
}

export default App;
