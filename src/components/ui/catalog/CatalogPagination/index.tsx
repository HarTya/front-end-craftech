import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TailSpin } from 'react-loader-spinner'
import { scroller } from 'react-scroll'

import Button from '@/ui/Button'
import Select from '@/ui/Select'
import Text from '@/ui/Text'
import ProductItem from '@/ui/catalog/ProductItem'
import Sidebar from '@/ui/catalog/Sidebar'

import { COLORS, VARS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

import { ICatalogPagination } from '@/types/product.interface'

import styles from './CatalogPagination.module.scss'
import { ProductService } from '@/services/product.service'
import { EnumProductsSort } from '@/services/types/product-data.interface'

const CatalogPagination: FC<ICatalogPagination> = ({ title, data }) => {
	const { viewportWidth } = useViewportWidth()

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

	const { ref, inView } = useInView({
		threshold: 0
	})

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	useEffect(() => {
		if (!inView) setIsSidebarOpen(false)
	}, [inView])

	return (
		<>
			<div className={styles.top}>
				<Text className={styles.title} topline>
					{title}
				</Text>
				<div className={styles.actions}>
					<div
						onClick={() => {
							scroller.scrollTo('shop-content', {
								duration: 500,
								smooth: 'easeInOutQuart',
								offset:
									viewportWidth <= 575
										? -VARS.headerHeightMobile / 2
										: -VARS.headerHeight / 2
							})
							setIsSidebarOpen(true)
						}}
						className={styles.open}
					>
						<Text size='body-small' color='accent-dark' nowrap>
							Категорії
						</Text>
					</div>
					<Select
						options={['Найновіші', 'Низька ціна', 'Висока ціна', 'Найдавніші']}
						sortType={sortType}
						setSortType={setSortType}
						className={styles.select}
					/>
				</div>
			</div>
			<section className={styles.section}>
				<div className={styles.observe} ref={ref} />
				<Sidebar
					setIsSidebarOpen={setIsSidebarOpen}
					pin={viewportWidth <= 796 ? inView && isSidebarOpen : inView}
				/>
				<div
					id='shop-content'
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
									length: Math.ceil(response.length / VARS.productsPerPage)
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
							size='subheading-large'
							color='accent-dark'
							nowrap
							className={styles.message}
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
