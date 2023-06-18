import { GetStaticProps, NextPage } from 'next'

import Home from '@/screens/Home'

import { VARS } from '@/config/variables.config'

import { IProductsPagination } from '@/types/product.interface'

import { ProductService } from '@/services/product.service'

const HomePage: NextPage<IProductsPagination> = ({ products, length }) => {
	return <Home products={products} length={length} />
}

export const getStaticProps: GetStaticProps<IProductsPagination> = async () => {
	try {
		const data = await ProductService.getAllProducts({
			page: 1,
			perPage: VARS.productsPerPage
		})

		return {
			props: { products: data.products, length: data.length },
			revalidate: 60
		}
	} catch {
		return {
			props: { products: [], length: 0 }
		}
	}
}

export default HomePage
