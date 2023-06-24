import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'

import Text from '@/ui/Text'
import ArrowIconDownLarge from '@/ui/icons/Arrow/ArrowIconDownLarge'

import { EnumOrderPickupType } from '@/types/order.interface'

import styles from './Select.module.scss'
import { ISelect } from './select.interface'
import { EnumProductsSort } from '@/services/types/product-data.interface'

const Select: FC<ISelect> = ({
	placeholder,
	prefix,
	activeOption,
	emptyMessage,
	options,
	setSelectedOptionForeign,
	error = false,
	setError,
	sortType,
	setSortType,
	pickupType,
	setPickupType,
	disabled = false,
	className
}) => {
	const [isActive, setIsActive] = useState(false)

	const [selectedOption, setSelectedOption] = useState(
		placeholder ? '' : options[0]
	)

	useEffect(() => {
		if (activeOption) setSelectedOption(activeOption)
	}, [])

	useEffect(() => {
		if (setSelectedOptionForeign) setSelectedOptionForeign(selectedOption)
	}, [selectedOption])

	useEffect(() => {
		switch (sortType) {
			case EnumProductsSort.HIGH_PRICE:
				setSelectedOption(options[0])
				break
			case EnumProductsSort.LOW_PRICE:
				setSelectedOption(options[1])
				break
			case EnumProductsSort.NEWEST:
				setSelectedOption(options[2])
				break
			case EnumProductsSort.OLDEST:
				setSelectedOption(options[3])
				break
		}
	}, [sortType])

	useEffect(() => {
		switch (pickupType) {
			case EnumOrderPickupType.STORE:
				setSelectedOption(options[0])
				break
			case EnumOrderPickupType.POST_OFFICE:
				setSelectedOption(options[1])
				break
		}
	}, [pickupType])

	return (
		<div
			onClick={() => {
				if (setError) setError(false)
				setIsActive(!isActive)
			}}
			className={clsx(
				styles.main,
				{
					[styles.error]: error,
					[styles.selected]: disabled,
					[styles.active]: !disabled && isActive
				},
				className
			)}
		>
			<Text
				size={placeholder ? 'body-small' : 'body-medium'}
				color={error ? 'error' : 'accent-dark'}
				nowrap
				className={styles.title}
			>
				{selectedOption
					? prefix
						? `${prefix} ${selectedOption}`
						: selectedOption
					: placeholder}
			</Text>
			<div className={styles.arrow}>
				<ArrowIconDownLarge
					color={sortType && setSortType ? 'accent' : 'accent-dark'}
					error={error}
				/>
			</div>
			{!options.length ? (
				<div className={clsx(styles.options, styles.options_empty)}>
					<Text size='body' color='accent-dark'>
						{emptyMessage ? emptyMessage : 'Варіанти на вибір відсутні'}
					</Text>
				</div>
			) : (
				<div className={styles.options}>
					{sortType && setSortType
						? (
								Object.keys(EnumProductsSort) as Array<
									keyof typeof EnumProductsSort
								>
						  ).map(
								key =>
									EnumProductsSort[key] !== sortType && (
										<div
											key={EnumProductsSort[key]}
											onClick={() => setSortType(EnumProductsSort[key])}
										>
											<Text size='body' color='accent-dark' nowrap>
												{EnumProductsSort[key] === EnumProductsSort.HIGH_PRICE
													? options[0]
													: EnumProductsSort[key] === EnumProductsSort.LOW_PRICE
													? options[1]
													: EnumProductsSort[key] === EnumProductsSort.NEWEST
													? options[2]
													: EnumProductsSort[key] === EnumProductsSort.OLDEST
													? options[3]
													: null}
											</Text>
										</div>
									)
						  )
						: pickupType && setPickupType
						? (
								Object.keys(EnumOrderPickupType) as Array<
									keyof typeof EnumOrderPickupType
								>
						  ).map(
								key =>
									EnumOrderPickupType[key] !== pickupType && (
										<div
											key={EnumOrderPickupType[key]}
											onClick={() => setPickupType(EnumOrderPickupType[key])}
										>
											<Text size='body' color='accent-dark' nowrap>
												{EnumOrderPickupType[key] === EnumOrderPickupType.STORE
													? options[0]
													: EnumOrderPickupType[key] ===
													  EnumOrderPickupType.POST_OFFICE
													? options[1]
													: null}
											</Text>
										</div>
									)
						  )
						: options.map(
								(name, index) =>
									name !== selectedOption && (
										<div key={index} onClick={() => setSelectedOption(name)}>
											<Text size='body' color='accent-dark' nowrap>
												{name}
											</Text>
										</div>
									)
						  )}
				</div>
			)}
		</div>
	)
}

export default Select
