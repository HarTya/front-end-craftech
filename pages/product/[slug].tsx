import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import Product from '@/screens/Product'

import { PAGES } from '@/config/pages.config'

import { IProductObjectFullset } from '@/types/product.interface'

import { ProductService } from '@/services/product.service'

const ProductPage: NextPage<{ product: IProductObjectFullset }> = ({
	product
}) => {
	const { replace } = useRouter()

	if (!product) {
		replace(PAGES.notFound)
		return null
	}

	return <Product data={product} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { products } = await ProductService.getAllProducts()

		const paths = products.map(product => {
			return {
				params: { slug: product.slug }
			}
		})

		return { paths, fallback: 'blocking' }
	} catch {
		const paths = [].map(() => {
			return {
				params: { slug: '' }
			}
		})

		return { paths, fallback: 'blocking' }
	}
}

export const getStaticProps: GetStaticProps<{
	product: IProductObjectFullset | null
}> = async ({ params }) => {
	try {
		const { data: product } = await ProductService.getProductBySlug(
			params?.slug as string
		)

		return {
			props: { product },
			revalidate: 60
		}
	} catch {
		return {
			props: { product: null }
		}
	}
}

export default ProductPage
