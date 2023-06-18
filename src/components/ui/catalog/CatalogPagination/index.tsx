import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TailSpin } from 'react-loader-spinner'

import Button from '@/ui/Button'
import Select from '@/ui/Select'
import Text from '@/ui/Text'
import ProductItem from '@/ui/catalog/ProductItem'
import Sidebar from '@/ui/catalog/Sidebar'

import { COLORS, VARS } from '@/config/variables.config'

import { ICatalogPagination } from '@/types/product.interface'

import styles from './CatalogPagination.module.scss'
import { ProductService } from '@/services/product.service'
import { EnumProductsSort } from '@/services/types/product-data.interface'

const CatalogPagination: FC<ICatalogPagination> = ({ title, data }) => {
	const [page, setPage] = useState(1)

	const [sortType, setSortType] = useState<EnumProductsSort>(
		EnumProductsSort.NEWEST
	)

	useEffect(() => {
		setPage(1)
	}, [sortType])

	const { data: response, isLoading } = useQuery(
		['get products', page, sortType],
		() =>
			ProductService.getAllProducts({
				page,
				perPage: VARS.productsPerPage,
				sort: sortType
			}),
		{
			initialData: data
		}
	)

	const [pagesCount, setPagesCount] = useState(1)

	useEffect(() => {
		if (pagesCount === 1)
			setPagesCount(Math.round(response.length / response.products.length))
	}, [])

	const { ref, inView } = useInView({
		threshold: 0
	})

	return (
		<>
			<div className={styles.title}>
				<Text topline>{title}</Text>
				<Select
					options={['Висока ціна', 'Низька ціна', 'Найновіші', 'Найдавніші']}
					sortType={sortType}
					setSortType={setSortType}
					className={styles.select}
				/>
			</div>
			<section className={styles.section}>
				<div className={styles.observe} ref={ref} />
				<Sidebar pin={inView} />
				<div
					className={clsx(styles.content, {
						[styles.content_pin]: inView
					})}
				>
					{isLoading ? (
						<TailSpin width={50} height={50} color={COLORS.accentDark} />
					) : response.products.length ? (
						<>
							<div className={styles.products}>
								{response.products.map(product => (
									<ProductItem key={product.id} product={product} />
								))}
							</div>
							<div className={styles.buttons}>
								{Array.from({
									length: pagesCount
								}).map((_, index) => {
									const pageNumber = index + 1
									return (
										<Button
											key={pageNumber}
											size='medium'
											bordered={page !== pageNumber}
											disabled={page === pageNumber}
											onClick={() => setPage(pageNumber)}
										>
											{pageNumber}
										</Button>
									)
								})}
							</div>
						</>
					) : (
						<Text
							className={styles.message}
							size='subheading-large'
							color='accent-dark'
							nowrap
						>
							Товари відсутні
						</Text>
					)}
				</div>
			</section>
		</>
	)
}

export default CatalogPagination
