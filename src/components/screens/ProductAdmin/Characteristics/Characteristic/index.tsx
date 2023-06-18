import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Text from '@/ui/Text'
import TrashIcon from '@/ui/icons/Trash/TrashIcon'

import { COLORS } from '@/config/variables.config'

import { ICharacteristicObject } from '@/types/characteristic.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Characteristic.module.scss'
import { CharacteristicService } from '@/services/characteristic.service'

const Characteristic: FC<{ data: ICharacteristicObject }> = ({ data }) => {
	const queryCache = useQueryClient()

	const { mutate, isLoading } = useMutation(
		['delete characteristic'],
		() => CharacteristicService.deleteCharacteristic(data.id),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get product admin'])
				toast.success('Характеристику видалено!')
			},
			onError(error) {
				toast.error(catchErrorMessage(error))
			}
		}
	)

	return (
		<div className={styles.main}>
			<div className={styles.content}>
				<Text className={styles.title} size='body-small' color='accent' nowrap>
					{data.title}
				</Text>
				<Text size='body-medium' color='accent-dark' nowrap>
					{data.description}
				</Text>
			</div>
			<div onClick={() => mutate()} className={styles.delete}>
				{isLoading ? (
					<TailSpin width={40} height={40} color={COLORS.accentDark} />
				) : (
					<TrashIcon />
				)}
			</div>
		</div>
	)
}

export default Characteristic
