import { FC, useState } from 'react'

import Select from '@/ui/Select'
import AddToCartButton from '@/ui/catalog/AddToCartButton'
import FavoriteButton from '@/ui/catalog/FavoriteButton'

import { useCart } from '@/hooks/useCart'

import { IProductObject } from '@/types/product.interface'

import styles from './Actions.module.scss'

const Actions: FC<{ product: IProductObject }> = ({ product }) => {
	const sizes = product.sizes
		.split(' ')
		.filter((value, index, array) => array.indexOf(value) === index)

	const [selectedSize, setSelectedSize] = useState('')

	const [cartError, setCartError] = useState(false)

	const { items } = useCart()

	const currentProduct = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<>
			<AddToCartButton
				product={product}
				size={selectedSize}
				setError={setCartError}
				className={styles.addToCart}
			/>
			<Select
				placeholder='Оберіть розмір'
				prefix='Розмір:'
				activeOption={currentProduct?.size}
				options={sizes}
				optionLimit={sizes.length > 6 ? 5 : 0}
				setSelectedOptionForeign={setSelectedSize}
				error={cartError}
				setError={setCartError}
				disabled={!!currentProduct}
				className={styles.select}
			/>
			<FavoriteButton
				productSlug={product.slug}
				variant='accent-dark'
				className={styles.favorite}
			/>
		</>
	)
}

export default Actions
