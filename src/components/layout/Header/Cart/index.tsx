import { FC, useState } from 'react'

import Button from '@/ui/Button'
import Modal from '@/ui/Modal'
import Text from '@/ui/Text'
import CartIcon from '@/ui/icons/Cart/CartIcon'

import { useCart } from '@/hooks/useCart'
import { useOrders } from '@/hooks/useOrders'

import { formatToCurrency } from '@/utils/format-to-currency'

import styles from './Cart.module.scss'
import CartItem from './CartItem'

const Cart: FC<{ className: string }> = ({ className }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isCloseModal, setIsCloseModal] = useState(false)

	const { items, total } = useCart()

	const { discount } = useOrders()

	return (
		<>
			<div
				className={className}
				onClick={() => {
					setIsModalOpen(true)
					setIsCloseModal(isModalOpen ? true : false)
				}}
			>
				{!!items.length && <Text size='body-small'>{items.length}</Text>}
				<CartIcon />
			</div>
			{isModalOpen ? (
				<Modal
					setIsOpen={setIsModalOpen}
					isForeignClose={isCloseModal}
					setIsForeignClose={setIsCloseModal}
					title='Ваш кошик'
				>
					{items.length ? (
						<>
							<div className={styles.main}>
								<div className={styles.main_top}>
									{items.map(item => (
										<CartItem key={item.id} item={item} />
									))}
								</div>
								<div className={styles.main_bottom}>
									<div>
										<Text size='body-small' color='accent-dark'>
											Загальна сума
										</Text>
										<Text color='accent'>{formatToCurrency(total)}</Text>
									</div>
									<Button size='medium'>Оформити замовлення</Button>
								</div>
							</div>
							{discount && (
								<div className={styles.discount}>
									<Text size='body-medium' color='accent-dark'>
										Діє знижка 10% на перше замовлення!
									</Text>
								</div>
							)}
						</>
					) : (
						<Text size='subheading-large' color='accent-dark'>
							Товари відсутні
						</Text>
					)}
				</Modal>
			) : (
				<></>
			)}
		</>
	)
}

export default Cart
