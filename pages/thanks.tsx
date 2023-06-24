import { NextPage } from 'next'

import Layout from '@/layout/Layout'

import Thanks from '@/screens/Thanks'

const ThanksPage: NextPage = () => {
	return (
		<Layout title='Дякуємо!'>
			<Thanks />
		</Layout>
	)
}

export default ThanksPage
