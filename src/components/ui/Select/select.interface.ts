import { Dispatch, SetStateAction } from 'react'

import { EnumProductsSort } from '@/services/types/product-data.interface'

export interface ISelect {
	placeholder?: string
	prefix?: string
	activeOption?: string
	emptyMessage?: string
	options: string[]
	setSelectedOptionForeign?: Dispatch<SetStateAction<string>>
	error?: boolean
	setError?: Dispatch<SetStateAction<boolean>>
	sortType?: EnumProductsSort
	setSortType?: Dispatch<SetStateAction<EnumProductsSort>>
	disabled?: boolean
	className?: string
}
