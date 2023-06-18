import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'

import Text from '@/ui/Text'

import {
	PAGES,
	dynamicAdminPageHref,
	dynamicPageHref
} from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import styles from './Categories.module.scss'
import NewCategory from './NewCategory'
import { CategoryService } from '@/services/category.service'

const Categories: FC = () => {
	const { asPath } = useRouter()

	const isAdminPage = asPath === PAGES.admin

	const { data: categories, isLoading } = useQuery(
		['get categories'],
		() =>
			isAdminPage
				? CategoryService.getAllCategoriesIncludeNew()
				: CategoryService.getAllCategories(),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			{isLoading ? (
				<div className={styles.message}>
					<TailSpin width={35} height={35} color={COLORS.accentDark} />
				</div>
			) : (
				<div className={styles.main}>
					{isAdminPage && <NewCategory />}
					{categories && categories.length
						? categories.map(category => (
								<Link
									key={category.id}
									href={
										isAdminPage
											? dynamicAdminPageHref('category', category.id)
											: dynamicPageHref('category', category.slug)
									}
									className={styles.item}
								>
									<Text size='body-medium' nowrap>
										{!category.name ? 'Нова категорія' : category.name}
									</Text>
								</Link>
						  ))
						: !isAdminPage && (
								<Text
									className={styles.message}
									size='body-medium'
									color='accent-dark'
									nowrap
								>
									Категорії відсутні
								</Text>
						  )}
				</div>
			)}
		</>
	)
}

export default Categories
