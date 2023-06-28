import dynamic from 'next/dynamic'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Text from '@/ui/Text'
import ProductRating from '@/ui/catalog/ProductRating'
import ArrowIconRightSmall from '@/ui/icons/Arrow/ArrowIconRightSmall'
import OpenIcon from '@/ui/icons/Open/OpenIcon'

import {
	PAGES,
	dynamicAdminPageHref,
	dynamicPageHref
} from '@/config/pages.config'

import { IProductObject } from '@/types/product.interface'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './ProductItem.module.scss'

const DynamicFavoriteButton = dynamic(
	() => import('@/ui/catalog/FavoriteButton'),
	{ ssr: false }
)

const ProductItem: FC<{ product: IProductObject }> = ({ product }) => {
	const { asPath } = useRouter()

	const isAdminPage = asPath === PAGES.admin

	return (
		<div className={styles.main}>
			<Link
				href={
					isAdminPage
						? dynamicAdminPageHref('product', product.id)
						: dynamicPageHref('product', product.slug)
				}
				className={styles.image}
			>
				{product.images[0] && (
					<Image
						draggable={false}
						src={product.images[0]}
						alt={product.name}
						layout='fill'
						objectFit='cover'
						placeholder='blur'
						blurDataURL={product.images[0]}
					/>
				)}
			</Link>
			<div className={styles.content}>
				<div className={styles.top}>
					<Link
						href={
							isAdminPage
								? dynamicAdminPageHref('category', product.category?.id)
								: dynamicPageHref('category', product.category?.slug)
						}
					>
						<Text size='caption-large' color='accent' weight='semibold'>
							{product.category?.name}
						</Text>
					</Link>
					{product.subcategory ? (
						<div className={styles.top_arrow}>
							<ArrowIconRightSmall />
						</div>
					) : (
						<></>
					)}
					<Link
						href={
							isAdminPage
								? dynamicAdminPageHref('subcategory', product.subcategory?.id)
								: dynamicPageHref('subcategory', product.subcategory?.slug)
						}
					>
						<Text size='caption-large' color='accent' weight='semibold'>
							{product.subcategory?.name}
						</Text>
					</Link>
				</div>
				<Link
					href={
						isAdminPage
							? dynamicAdminPageHref('product', product.id)
							: dynamicPageHref('product', product.slug)
					}
				>
					<Text size='body' nowrap>
						{!product.name ? 'Новий товар' : product.name}
					</Text>
				</Link>
				<ProductRating
					reviews={product.reviews}
					starSize={13}
					textSize='caption'
					className={styles.rating}
				/>
				<div className={styles.bottom}>
					<Text size='body-medium' color='accent'>
						{formatToCurrency(product.price)}
					</Text>
					{isAdminPage && product.slug ? (
						<Link
							className={styles.link}
							href={dynamicPageHref('product', product.slug)}
						>
							<OpenIcon />
						</Link>
					) : (
						<DynamicFavoriteButton productSlug={product.slug} />
					)}
				</div>
			</div>
		</div>
	)
}

export default ProductItem
