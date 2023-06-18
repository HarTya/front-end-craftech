import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'

import Layout from '@/layout/Layout'

import CategoryAdmin from '@/screens/CategoryAdmin'
import styles from '@/screens/CategoryAdmin/CategoryAdmin.module.scss'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { CategoryService } from '@/services/category.service'

const CategoryAdminPage: NextPageAuth = () => {
	const { query, replace } = useRouter()

	const id = query.id ? +query.id : ''

	const {
		data: category,
		isError,
		isLoading
	} = useQuery(
		['get category admin', id],
		() => CategoryService.getCategoryById(id),
		{
			select: ({ data }) => data
		}
	)

	if (isError) {
		replace(PAGES.admin)
		return null
	}

	return (
		<Layout title='Адмін панель'>
			<section className={styles.section}>
				{isLoading ? (
					<TailSpin width={50} height={50} color={COLORS.accent} />
				) : (
					<CategoryAdmin data={category} />
				)}
			</section>
		</Layout>
	)
}

CategoryAdminPage.isOnlyAdmin = true

export default CategoryAdminPage
