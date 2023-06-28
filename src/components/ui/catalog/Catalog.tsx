import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { TailSpin } from 'react-loader-spinner'

import Button from '@/ui/Button'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'
import ArrowIconRightLarge from '@/ui/icons/Arrow/ArrowIconRightLarge'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { useViewportWidth } from '@/hooks/useViewportWidth'

import { ICatalog } from '@/types/product.interface'

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
	const { viewportWidth } = useViewportWidth()

	const isAdminPage = asPath === PAGES.admin

	const { ref, inView } = useInView({
		threshold: 0
	})

	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<>
			<div
				className={clsx(styles.top, {
					[styles.top_back]: backUrl,
					[styles.top_additionalTitle]: additionalTitle,
					[styles.top_sidebar]: sidebar
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
					<Text className={styles.title} topline nowrap>
						{title}
					</Text>
				) : (
					<div className={styles.title}>
						<Text topline>{title}</Text>
						<div className={styles.title_arrow}>
							<ArrowIconRightLarge />
						</div>
						<Text>{additionalTitle}</Text>
					</div>
				)}
				{sidebar && (
					<div className={styles.actions}>
						<div onClick={() => setIsSidebarOpen(true)} className={styles.open}>
							<Text size='body-small' color='accent-dark' nowrap>
								{subcategories ? 'Підкатегорії' : 'Категорії'}
							</Text>
						</div>
					</div>
				)}
			</div>
			<section className={styles.section}>
				{sidebar && (
					<>
						<div className={styles.observe} ref={ref} />
						<Sidebar
							isSidebarOpen={isSidebarOpen}
							setIsSidebarOpen={setIsSidebarOpen}
							pin={viewportWidth <= 796 ? isSidebarOpen : inView}
							subcategories={subcategories}
						/>
					</>
				)}
				<div
					id='shop-content'
					className={clsx(styles.content, {
						[styles.content_sidebar]: sidebar,
						[styles.content_pin]: inView
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
											size='subheading-large'
											color='accent-dark'
											nowrap
											className={styles.message}
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
