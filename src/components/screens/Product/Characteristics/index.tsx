import clsx from 'clsx'
import { FC, useState } from 'react'

import Text from '@/ui/Text'
import ArrowIconDownSmall from '@/ui/icons/Arrow/ArrowIconDownSmall'

import { ICharacteristicObject } from '@/types/characteristic.interface'

import Characteristic from './Characteristic'
import styles from './Characteristics.module.scss'

const Characteristics: FC<{ data: ICharacteristicObject[] }> = ({ data }) => {
	const [showMoreCharacteristics, setShowMoreCharacteristics] = useState(false)

	if (!data.length) return null

	return (
		<div
			className={clsx(styles.main, {
				[styles.main_button]: data.length > 6
			})}
		>
			<div className={styles.content}>
				{data.map((characteristic, index) => {
					const characteristicNumber = index + 1

					if (characteristicNumber <= 6 || showMoreCharacteristics) {
						return (
							<Characteristic key={characteristic.id} data={characteristic} />
						)
					}
				})}
			</div>
			{data.length > 6 && (
				<div
					className={clsx(styles.button, {
						[styles.button_active]: showMoreCharacteristics
					})}
					onClick={() => setShowMoreCharacteristics(!showMoreCharacteristics)}
				>
					<Text size='body' color='accent'>
						Усі характеристики
					</Text>
					<ArrowIconDownSmall />
				</div>
			)}
		</div>
	)
}

export default Characteristics
