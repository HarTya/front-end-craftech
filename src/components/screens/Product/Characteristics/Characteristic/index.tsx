import { FC } from 'react'

import Text from '@/ui/Text'

import { ICharacteristicObject } from '@/types/characteristic.interface'

import styles from './Characteristic.module.scss'

const Characteristic: FC<{ data: ICharacteristicObject }> = ({ data }) => {
	return (
		<div className={styles.main}>
			<Text className={styles.title} size='body' color='accent' nowrap>
				{data.title}
			</Text>
			<Text size='body-small' color='accent-dark' nowrap>
				{data.description}
			</Text>
		</div>
	)
}

export default Characteristic
