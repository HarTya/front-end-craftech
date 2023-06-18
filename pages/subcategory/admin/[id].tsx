import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'

import Layout from '@/layout/Layout'

import SubcategoryAdmin from '@/screens/SubcategoryAdmin'
import styles from '@/screens/SubcategoryAdmin/SubcategoryAdmin.module.scss'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { SubcategoryService } from '@/services/subcategory.service'

const SubcategoryAdminPage: NextPageAuth = () => {
	const { query, replace } = useRouter()

	const id = query.id ? +query.id : ''

	const {
		data: subcategory,
		isError,
		isLoading
	} = useQuery(
		['get subcategory admin', id],
		() => SubcategoryService.getSubcategoryById(id),
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
					<SubcategoryAdmin data={subcategory} />
				)}
			</section>
		</Layout>
	)
}

SubcategoryAdminPage.isOnlyAdmin = true

export default SubcategoryAdminPage
