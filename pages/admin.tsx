import { useQuery } from '@tanstack/react-query'

import Layout from '@/layout/Layout'

import Catalog from '@/ui/catalog/Catalog'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { ProductService } from '@/services/product.service'

const AdminPage: NextPageAuth = () => {
	const { data: products, isLoading } = useQuery(['get products'], () =>
		ProductService.getAllProductsIncludeNew()
	)

	return (
		<Layout title='Адмін панель'>
			<Catalog
				title='Адмін панель'
				data={{ products: products || [] }}
				isLoading={isLoading}
				sidebar
			/>
		</Layout>
	)
}

AdminPage.isOnlyAdmin = true

export default AdminPage
