import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import Modal from '@/ui/Modal'

import { COLORS } from '@/config/variables.config'

import { ICharacteristicObject } from '@/types/characteristic.interface'

import { catchErrorMessage } from '@/api/api.helper'

import Characteristic from './Characteristic'
import styles from './Characteristics.module.scss'
import { CharacteristicService } from '@/services/characteristic.service'
import { ICharacteristicData } from '@/services/types/characteristic-data.interface'

const Characteristics: FC<{
	productId: number
	data: ICharacteristicObject[]
}> = ({ productId, data }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const queryCache = useQueryClient()

	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<ICharacteristicData>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<ICharacteristicData> = data => {
		setIsLoading(true)

		CharacteristicService.createCharacteristic(productId, data)
			.then(() => {
				setIsLoading(false)
				reset()
				queryCache.invalidateQueries(['get product admin'])
				toast.success('Характеристику додано!')
			})
			.catch(error => {
				setIsLoading(false)
				setError(catchErrorMessage(error))
				if (catchErrorMessage(error).includes('не знайдено'))
					toast.error(catchErrorMessage(error))
			})
	}

	useEffect(() => {
		setError('')
	}, [watch('title'), watch('description')])

	return (
		<>
			<Button
				onClick={() => setIsModalOpen(true)}
				className={styles.open}
				rounder
				bordered
			>
				Характеристики
			</Button>
			{isModalOpen ? (
				<Modal setIsOpen={setIsModalOpen} title='Характеристики'>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
						<Field
							{...formRegister('title', {
								required: 'Назву характеристики не вказано',
								minLength: {
									value: 4,
									message:
										'Назва характеристики має бути не коротшою за 4 символи'
								},
								maxLength: {
									value: 24,
									message:
										'Назва характеристики має бути не довшою за 24 символи'
								}
							})}
							className={styles.field}
							title='Назва характеристики'
							autoComplete='off'
							error={
								errors.title?.message ||
								(error.includes('Характеристика') ? error : '') ||
								(error.includes('Назва характеристики') ? error : '')
							}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('description', {
								required: 'Опис характеристики не вказано',
								minLength: {
									value: 3,
									message:
										'Опис характеристики має бути не коротшим за 3 символи'
								},
								maxLength: {
									value: 30,
									message:
										'Опис характеристики має бути не довшим за 30 символів'
								}
							})}
							className={styles.field}
							title='Опис характеристики'
							autoComplete='off'
							error={
								errors.description?.message ||
								(error.includes('Опис характеристики') ? error : '')
							}
							disabled={isLoading}
						/>
						<Button
							className={styles.button}
							type='submit'
							rounder
							disabled={isLoading || !!error}
						>
							{isLoading ? (
								<Triangle height={45} width={45} color={COLORS.accentDark} />
							) : (
								'Додати'
							)}
						</Button>
					</form>
					{!!data.length && (
						<div className={styles.main}>
							{data.map(characteristic => (
								<Characteristic key={characteristic.id} data={characteristic} />
							))}
						</div>
					)}
				</Modal>
			) : (
				<></>
			)}
		</>
	)
}

export default Characteristics
