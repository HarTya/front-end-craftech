import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/layout/Layout'

import Catalog from '@/ui/catalog/Catalog'

import { PAGES } from '@/config/pages.config'

import { ProductService } from '@/services/product.service'

const SearchPage: NextPage = () => {
	const { query } = useRouter()

	const { data, isLoading } = useQuery(['search products', query.term], () =>
		ProductService.getAllProducts({
			searchTerm: query.term as string
		})
	)

	return (
		<Layout title='Пошук'>
			<Catalog
				title={`Пошук по запиту "${query.term || ''}"`}
				backUrl={PAGES.home}
				data={{ products: data?.products || [] }}
				isLoading={isLoading}
			/>
		</Layout>
	)
}

export default SearchPage
