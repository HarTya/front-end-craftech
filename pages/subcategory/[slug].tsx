import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/layout/Layout'

import Catalog from '@/ui/catalog/Catalog'

import { PAGES, dynamicPageHref } from '@/config/pages.config'

import { IProductObject } from '@/types/product.interface'
import {
	ISubcategoryObjectCategory,
	ISubcategoryPage
} from '@/types/subcategory.interface'

import { ProductService } from '@/services/product.service'
import { SubcategoryService } from '@/services/subcategory.service'

const SubcategoryPage: NextPage<ISubcategoryPage> = ({
	products,
	subcategory
}) => {
	const { replace } = useRouter()

	if (!products && !subcategory) {
		replace(PAGES.notFound)
		return null
	}

	return (
		<Layout
			title={`${subcategory.category.name} > ${subcategory.name}`}
			description={`Сторінка підкатегорії ${subcategory.name} з категорії ${subcategory.category.name}`}
		>
			<Catalog
				title={subcategory.category.name}
				backUrl={dynamicPageHref('category', subcategory.category.slug)}
				additionalTitle={subcategory.name}
				data={{ products }}
			/>
		</Layout>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: subcategories } =
			await SubcategoryService.getAllSubcategories()

		const paths = subcategories.map(subcategory => {
			return {
				params: { slug: subcategory.slug }
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
	subcategory: ISubcategoryObjectCategory | null
}> = async ({ params }) => {
	try {
		const { data: products } = await ProductService.getProductsBySubcategory(
			params?.slug as string
		)

		const { data: subcategory } = await SubcategoryService.getSubcategoryBySlug(
			params?.slug as string
		)

		return {
			props: {
				products,
				subcategory
			},
			revalidate: 60
		}
	} catch {
		return {
			props: {
				products: null,
				subcategory: null
			}
		}
	}
}

export default SubcategoryPage
