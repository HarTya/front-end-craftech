import { useOrders } from './useOrders'
import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const items = useTypedSelector(state => state.cart.items)

	const { discount } = useOrders()

	const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

	return { items, total: discount ? total - total * (10 / 100) : total }
}
