import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FC } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import Layout from '@/layout/Layout'

import Text from '@/ui/Text'
import ProductRating from '@/ui/catalog/ProductRating'
import ArrowIconRightMedium from '@/ui/icons/Arrow/ArrowIconRightMedium'

import { dynamicPageHref } from '@/config/pages.config'
import { VARS } from '@/config/variables.config'

import { IProductObjectFullset } from '@/types/product.interface'

import { formatToCurrency } from '@/utils/format-to-currency'

import Actions from './Actions'
import Characteristics from './Characteristics'
import Gallery from './Gallery'
import styles from './Product.module.scss'
import Reviews from './Reviews'
import { ReviewService } from '@/services/review.service'

const Product: FC<{ data: IProductObjectFullset }> = ({ data }) => {
	const { data: reviews, isLoading } = useQuery(
		['get reviews by product', data.slug],
		() => ReviewService.getReviewsByProduct(data.slug),
		{
			initialData: data.reviews
		}
	)

	return (
		<Layout title={data.name} description={`Сторінка товару ${data.name}`}>
			<section className={styles.section}>
				<Text topline>{data.name}</Text>
				<div className={styles.content}>
					<div className={styles.content_left}>
						<div className={styles.top}>
							<Link href={dynamicPageHref('category', data.category?.slug)}>
								<Text size='subheading-medium' color='accent'>
									{data.category?.name}
								</Text>
							</Link>
							{data.subcategory ? (
								<div className={styles.top_arrow}>
									<ArrowIconRightMedium />
								</div>
							) : (
								<></>
							)}
							<Link
								href={dynamicPageHref('subcategory', data.subcategory?.slug)}
							>
								<Text size='subheading-medium' color='accent'>
									{data.subcategory?.name}
								</Text>
							</Link>
						</div>
						<ScrollLink
							to='reviews'
							offset={-VARS.headerHeight - 62}
							spy={true}
							smooth={true}
							duration={750}
							className={styles.link}
						>
							<ProductRating
								reviews={reviews}
								starSize={35}
								textSize='body-medium'
								className={styles.rating}
							/>
						</ScrollLink>
						<Gallery images={data.images} />
					</div>
					<div className={styles.content_right}>
						<div>
							<Text size='body' color='accent'>
								Ми приймаємо:
							</Text>
							<Text size='body' color='accent-dark'>
								Готівку
							</Text>
							<Text size='body' color='accent-dark'>
								Переказ на картку
							</Text>
							<Text size='body' color='accent-dark'>
								Накладений платіж
							</Text>
						</div>
						<div>
							<div>
								<Text size='subheading-large' color='accent'>
									{formatToCurrency(data.price)}
								</Text>
								<Text size='body' color='accent-dark' nowrap>
									{data.status}
								</Text>
							</div>
							<Actions product={data} />
						</div>
						<div>
							<div>
								<Text size='body-medium' color='accent'>
									Самовивіз з магазину м. Запоріжжя
								</Text>
								<div></div>
								<Text size='body-medium' color='accent-dark'>
									Безкоштовно
								</Text>
							</div>
							<div>
								<Text size='body-medium' color='accent'>
									Самовивіз з відділень "Нової пошти"
								</Text>
								<div></div>
								<Text size='body-medium' color='accent-dark'>
									70-200 грн
								</Text>
							</div>
							<div>
								<Text size='body-medium' color='accent'>
									Відправка товару поштою
								</Text>
								<div></div>
								<Text size='body-medium' color='accent-dark'>
									до 17:00
								</Text>
							</div>
						</div>
						<Characteristics data={data.characteristics} />
					</div>
				</div>
				<div className={styles.content_bottom}>
					<div className={styles.description}>
						<Text topline>Опис товару</Text>
						<Text
							size='subheading-medium'
							color='accent-dark'
							prewrap
							className={styles.description_content}
						>
							{data.description}
						</Text>
					</div>
					<Reviews
						reviews={reviews}
						productId={data.id}
						isReviewsLoading={isLoading}
					/>
				</div>
			</section>
		</Layout>
	)
}

export default Product
