import { FC } from 'react'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IAddToCartButton } from './AddToCartButton.interface'

const AddToCartButton: FC<IAddToCartButton> = ({
	product,
	size,
	error,
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
			onClick={() => {
				if (currentProduct) {
					removeFromCart({ id: currentProduct.id })
					toast.success('Товар видалено з кошика!')
				} else if (size) {
					addToCart({
						product,
						size,
						quantity: 1,
						price: product.price
					})
					toast.success('Товар додано до кошика!')
				} else {
					setError(true)
					toast.error(
						'Будь ласка, оберіть розмір товару, щоб додати його до кошика'
					)
				}
			}}
			size='medium'
			className={className}
			disabled={error}
		>
			{currentProduct ? 'У кошику' : 'У кошик'}
		</Button>
	)
}

export default AddToCartButton
