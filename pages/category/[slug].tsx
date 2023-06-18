import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/layout/Layout'

import Catalog from '@/ui/catalog/Catalog'

import { PAGES } from '@/config/pages.config'

import { ICategoryObject, ICategoryPage } from '@/types/category.interface'
import { IProductObject } from '@/types/product.interface'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

const CategoryPage: NextPage<ICategoryPage> = ({ products, category }) => {
	const { replace } = useRouter()

	if (!products && !category) {
		replace(PAGES.notFound)
		return null
	}

	return (
		<Layout
			title={category.name}
			description={`Сторінка категорії ${category.name}`}
		>
			<Catalog
				title={category.name}
				backUrl={PAGES.home}
				data={{ products }}
				sidebar
				subcategories={category.subcategories}
			/>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: categories } = await CategoryService.getAllCategories()

		const paths = categories.map(category => {
			return {
				params: { slug: category.slug }
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
	products: IProductObject[] | null
	category: ICategoryObject | null
}> = async ({ params }) => {
	try {
		const { data: products } = await ProductService.getProductsByCategory(
			params?.slug as string
		)

		const { data: category } = await CategoryService.getCategoryBySlug(
			params?.slug as string
		)

		return {
			props: {
				products,
				category
			},
			revalidate: 60
		}
	} catch {
		return {
			props: {
				products: null,
				category: null
			}
		}
	}
}

export default CategoryPage
