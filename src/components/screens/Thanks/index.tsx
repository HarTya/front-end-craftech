import { useRouter } from 'next/router'
import { FC } from 'react'

import Button from '@/ui/Button'
import Text from '@/ui/Text'

import { PAGES } from '@/config/pages.config'

import styles from './Thanks.module.scss'

const Thanks: FC = () => {
	const { replace } = useRouter()

	return (
		<section className={styles.section}>
			<div className={styles.main}>
				<Text topline nowrap>
					Дякуємо за замовлення!
				</Text>
				<Text className={styles.text} size='subheading' color='accent'>
					Найближчим часом з Вами зв'яжуться для уточнення деталей замовлення.
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

export default Thanks
