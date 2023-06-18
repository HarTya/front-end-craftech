import { FC } from 'react'

import Layout from '@/layout/Layout'

import NotFound from '@/screens/NotFound'

const Custom404: FC = () => {
	return (
		<Layout title='Сторінку не знайдено'>
			<NotFound />
		</Layout>
	)
}

export default Custom404
