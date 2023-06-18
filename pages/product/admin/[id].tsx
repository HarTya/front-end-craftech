import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { TailSpin } from 'react-loader-spinner'

import Layout from '@/layout/Layout'

import ProductAdmin from '@/screens/ProductAdmin'
import styles from '@/screens/ProductAdmin/ProductAdmin.module.scss'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

const ProductAdminPage: NextPageAuth = () => {
	const { query, replace } = useRouter()

	const id = query.id ? +query.id : ''

	const {
		data: product,
		isError,
		isLoading
	} = useQuery(
		['get product admin', id],
		() => ProductService.getProductById(id),
		{
			select: ({ data }) => data
		}
	)

	const {
		data: categories,
		isError: isCategoriesError,
		isLoading: isCategoriesLoading
	} = useQuery(['get categories'], () => CategoryService.getAllCategories(), {
		select: ({ data }) => data
	})

	if (isError || isCategoriesError) {
		replace(PAGES.admin)
		return null
	}

	return (
		<Layout title='Адмін панель'>
			<section className={styles.section}>
				{isLoading || isCategoriesLoading ? (
					<TailSpin width={50} height={50} color={COLORS.accent} />
				) : (
					<ProductAdmin data={product} categories={categories} />
				)}
			</section>
		</Layout>
	)
}

ProductAdminPage.isOnlyAdmin = true

export default ProductAdminPage
