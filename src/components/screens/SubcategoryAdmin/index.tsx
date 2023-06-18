import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { dynamicAdminPageHref } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { ISubcategoryObjectCategory } from '@/types/subcategory.interface'

import { catchErrorMessage } from '@/api/api.helper'

import DeleteSubcategory from './DeleteSubcategory'
import styles from './SubcategoryAdmin.module.scss'
import { SubcategoryService } from '@/services/subcategory.service'

const SubcategoryAdmin: FC<{ data: ISubcategoryObjectCategory }> = ({
	data
}) => {
	const subcategoryId = data.id

	const { push } = useRouter()

	const queryCache = useQueryClient()

	const [isEdited, setIsEdited] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	const {
		register: formRegister,
		getValues,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<{ subcategoryName: string }>({
		mode: 'onChange',
		defaultValues: {
			subcategoryName: data.name
		}
	})

	const onSubmit: SubmitHandler<{ subcategoryName: string }> = async ({
		subcategoryName
	}) => {
		setIsLoading(true)

		SubcategoryService.updateSubcategory(subcategoryId, subcategoryName)
			.then(() => {
				setIsLoading(false)
				queryCache.invalidateQueries(['get subcategory admin'])
				toast.success('Підкатегорію оновлено!')
			})
			.catch(error => {
				setIsLoading(false)
				setError(catchErrorMessage(error))
			})
	}

	useEffect(() => {
		setError('')
		if (getValues('subcategoryName').trim() !== data.name) setIsEdited(true)
		else setIsEdited(false)
	}, [data, watch('subcategoryName')])

	return (
		<>
			<div className={styles.title}>
				<div
					className={styles.back}
					onClick={() =>
						push(dynamicAdminPageHref('category', data.category.id))
					}
				>
					<Button rounder hover>
						<ArrowIconLeft />
					</Button>
				</div>
				<Text size='subheading-large' color='accent'>
					{!data.category.name
						? 'Нова категорія'
						: `Категорія - ${data.category.name}`}
				</Text>
				<Text size='subheading-medium' color='accent'>
					{!data.name ? 'Нова підкатегорія' : `Підкатегорія - ${data.name}`}
				</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('subcategoryName', {
						required: 'Назву підкатегорії не вказано',
						minLength: {
							value: 3,
							message: 'Назва підкатегорії має бути не коротшою за 3 символи'
						},
						maxLength: {
							value: 20,
							message: 'Назва підкатегорії має бути не довшою за 20 символів'
						}
					})}
					className={styles.field}
					title='Назва підкатегорії'
					autoComplete='off'
					placeholder={!data.name ? 'Нова підкатегорія' : data.name}
					error={errors.subcategoryName?.message || error}
					disabled={isLoading}
				/>
				<Button
					className={styles.button}
					type='submit'
					rounder
					disabled={isLoading || !isEdited || !!error}
				>
					{isLoading ? (
						<Triangle height={45} width={45} color={COLORS.accentDark} />
					) : (
						'Підтвердити'
					)}
				</Button>
			</form>
			<DeleteSubcategory
				subcategoryId={subcategoryId}
				categoryId={data.category.id}
			/>
		</>
	)
}

export default SubcategoryAdmin
