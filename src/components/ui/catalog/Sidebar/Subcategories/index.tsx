import Link from 'next/link'
import { FC } from 'react'

import Text from '@/ui/Text'

import { dynamicPageHref } from '@/config/pages.config'

import { ISubcategoryObject } from '@/types/subcategory.interface'

import styles from './Subcategories.module.scss'

const Subcategories: FC<{ data: ISubcategoryObject[] }> = ({ data }) => {
	const subcategories = data.filter(subcategory => subcategory.name)

	return (
		<>
			<div className={styles.main}>
				{subcategories.length ? (
					subcategories.map(subcategory => (
						<Link
							key={subcategory.id}
							href={dynamicPageHref('subcategory', subcategory.slug)}
							className={styles.item}
						>
							<Text size='body-medium' nowrap>
								{subcategory.name}
							</Text>
						</Link>
					))
				) : (
					<Text
						className={styles.message}
						size='body-medium'
						color='accent-dark'
						nowrap
					>
						Підкатегорії відсутні
					</Text>
				)}
			</div>
		</>
	)
}

export default Subcategories
