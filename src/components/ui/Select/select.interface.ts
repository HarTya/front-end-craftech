import { Dispatch, SetStateAction } from 'react'

import { EnumOrderPickupType } from '@/types/order.interface'

import { EnumProductsSort } from '@/services/types/product-data.interface'

export interface ISelect {
	placeholder?: string
	prefix?: string
	activeOption?: string
	emptyMessage?: string
	options: string[]
	optionLimit?: number
	disableOptionNowrap?: boolean
	setSelectedOptionForeign?: Dispatch<SetStateAction<string>>
	error?: boolean
	setError?: Dispatch<SetStateAction<boolean>>
	sortType?: EnumProductsSort
	setSortType?: Dispatch<SetStateAction<EnumProductsSort>>
	pickupType?: EnumOrderPickupType
	setPickupType?: Dispatch<SetStateAction<EnumOrderPickupType>>
	disabled?: boolean
	className?: string
}
