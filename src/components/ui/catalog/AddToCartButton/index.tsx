import { FC } from 'react'

import Button from '@/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IAddToCartButton } from './AddToCartButton.interface'

const AddToCartButton: FC<IAddToCartButton> = ({
	product,
	size,
	setError,
	className
}) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentProduct = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<Button
			className={className}
			size='medium'
			onClick={() =>
				currentProduct
					? removeFromCart({ id: currentProduct.id })
					: size
					? addToCart({
							product,
							size,
							quantity: 1,
							price: product.price
					  })
					: setError(true)
			}
		>
			{currentProduct ? 'У кошику' : 'У кошик'}
		</Button>
	)
}

export default AddToCartButton
