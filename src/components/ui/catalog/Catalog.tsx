import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useInView } from 'react-intersection-observer'
import { TailSpin } from 'react-loader-spinner'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { ICatalog } from '@/types/product.interface'

import ArrowIconRightLarge from '../icons/Arrow/ArrowIconRightLarge'

import styles from './Catalog.module.scss'
import NewProduct from './NewProduct'
import ProductItem from './ProductItem'
import Sidebar from './Sidebar'

const Catalog: FC<ICatalog> = ({
	title,
	backUrl,
	additionalTitle,
	data,
	isLoading = false,
	sidebar = false,
	subcategories
}) => {
	const { push, asPath } = useRouter()

	const isAdminPage = asPath === PAGES.admin

	const { ref, inView } = useInView({
		threshold: 0
	})

	return (
		<>
			<div
				className={clsx(styles.title, {
					[styles.title_back]: backUrl,
					[styles.title_sidebar]: sidebar
				})}
			>
				{backUrl && (
					<div className={styles.back} onClick={() => push(backUrl)}>
						<Button rounder hover>
							<ArrowIconLeft />
						</Button>
					</div>
				)}
				{!additionalTitle ? (
					<Text topline nowrap>
						{title}
					</Text>
				) : (
					<div className={styles.title_additionalTitle}>
						<Text topline>{title}</Text>
						<div className={styles.title_additionalTitle_arrow}>
							<ArrowIconRightLarge />
						</div>
						<Text>{additionalTitle}</Text>
					</div>
				)}
			</div>
			<section className={styles.section}>
				{sidebar && (
					<>
						<div className={styles.observe} ref={ref} />
						<Sidebar pin={inView} subcategories={subcategories} />
					</>
				)}
				<div
					className={clsx(styles.content, {
						[styles.content_sidebar]: sidebar,
						[styles.content_pin]: sidebar && inView
					})}
				>
					{isLoading ? (
						<TailSpin width={50} height={50} color={COLORS.accentDark} />
					) : (
						<div className={styles.products}>
							{isAdminPage && <NewProduct />}
							{data.products.length
								? data.products.map(product => (
										<ProductItem key={product.id} product={product} />
								  ))
								: !isAdminPage && (
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
					)}
				</div>
			</section>
		</>
	)
}

export default Catalog
