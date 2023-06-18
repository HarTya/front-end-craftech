import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='icon' href='/favicon.ico' sizes='16x16' type='image/ico' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
