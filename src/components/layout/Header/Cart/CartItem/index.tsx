import Image from 'next/legacy/image'
import { FC } from 'react'

import Text from '@/ui/Text'

import { ICartItem } from '@/types/cart.interface'

import { formatToCurrency } from '@/utils/format-to-currency'

import CartActions from './CartActions'
import styles from './CartItem.module.scss'

const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	return (
		<div className={styles.main}>
			<div className={styles.info}>
				<div className={styles.image}>
					<Image
						src={item.product.images[0]}
						alt={item.product.name}
						layout='fill'
						objectFit='cover'
						quality={100}
					/>
				</div>
				<div className={styles.top}>
					<div>
						<Text size='body' className={styles.name}>
							{item.product.name}
						</Text>
						<div className={styles.price}>
							{item.quantity >= 20 ? (
								<Text size='body-large' color='accent'>
									Договірна ціна
								</Text>
							) : (
								<>
									<Text size='subheading-medium' color='accent'>
										{formatToCurrency(item.product.price)}
									</Text>
									{item.quantity >= 10 ? (
										<Text size='body-small' color='accent-dark'>
											-10%
										</Text>
									) : item.quantity >= 5 ? (
										<Text size='body-small' color='accent-dark'>
											-5%
										</Text>
									) : (
										<></>
									)}
								</>
							)}
						</div>
					</div>
					<div>
						<Text size='body' color='accent'>
							Розмір:
						</Text>
						<Text
							className={styles.size}
							size='body-small'
							color='accent-dark'
							nowrap
						>
							{item.size}
						</Text>
					</div>
				</div>
			</div>
			<CartActions item={item} />
		</div>
	)
}

export default CartItem
