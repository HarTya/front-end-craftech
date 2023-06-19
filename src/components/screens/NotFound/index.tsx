import { useRouter } from 'next/router'
import { FC } from 'react'

import Button from '@/ui/Button'
import Text from '@/ui/Text'

import { PAGES } from '@/config/pages.config'

import styles from './NotFound.module.scss'

const NotFound: FC = () => {
	const { replace } = useRouter()

	return (
		<section className={styles.section}>
			<div className={styles.main}>
				<Text topline nowrap>
					Сторінку не знайдено
				</Text>
				<Text className={styles.text} size='subheading' color='accent'>
					Будь ласка, перевірте правильність URL-адреси та спробуйте ще раз.
					Якщо у вас виникають питання, звертайтеся до нашої головної сторінки,
					щоб знайти потрібну інформацію.
				</Text>
				<Button
					className={styles.button}
					onClick={() => replace(PAGES.home)}
					size='medium'
					hover
				>
					Перейти на головну сторінку
				</Button>
			</div>
		</section>
	)
}

export default NotFound
