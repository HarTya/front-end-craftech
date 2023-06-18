import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import Input from '@/ui/Input'
import MinusIcon from '@/ui/icons/Minus/MinusIcon'
import PlusIcon from '@/ui/icons/Plus/PlusIcon'
import TrashIcon from '@/ui/icons/Trash/TrashIcon'

import { useActions } from '@/hooks/useActions'

import { ICartItem } from '@/types/cart.interface'

import styles from './CartActions.module.scss'

const CartActions: FC<{ item: ICartItem }> = ({ item }) => {
	const { removeFromCart, changeQuantity, setQuantity, setWholesalePrice } =
		useActions()

	const [quantityValue, setQuantityValue] = useState('')

	useEffect(() => {
		setWholesalePrice({ id: item.id })

		setQuantityValue(String(item.quantity))
	}, [item.quantity])

	useEffect(() => {
		if (quantityValue) {
			setQuantityValue(String(Math.round(+quantityValue)))

			if (isNaN(+quantityValue) || +quantityValue < 1 || +quantityValue > 999)
				setQuantityValue('')
			else setQuantity({ id: item.id, value: +quantityValue })
		}
	}, [quantityValue])

	return (
		<div className={styles.main}>
			<div className={styles.quantity}>
				<div
					onClick={() => changeQuantity({ id: item.id, type: 'minus' })}
					className={clsx(styles.quantity_change, {
						[styles.disabled]: +quantityValue === 1
					})}
				>
					<MinusIcon />
				</div>
				<Input
					name='quantity'
					autoComplete='off'
					state={quantityValue}
					setState={setQuantityValue}
					color='accent-dark'
					className={styles.quantity_input}
					onBlur={() =>
						!quantityValue && setQuantityValue(String(item.quantity))
					}
				/>
				<div
					onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
					className={clsx(styles.quantity_change, {
						[styles.disabled]: +quantityValue === 999
					})}
				>
					<PlusIcon />
				</div>
			</div>
			<div
				onClick={() => removeFromCart({ id: item.id })}
				className={styles.delete}
			>
				<TrashIcon />
			</div>
		</div>
	)
}

export default CartActions
