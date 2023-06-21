import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import validator from 'validator'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import Text from '@/ui/Text'

import { configImageUrl } from '@/config/cloudinary.config'
import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { useActions } from '@/hooks/useActions'

import { EnumUserRole, IProfileObject } from '@/types/user.interface'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Profile.module.scss'
import { CloudinaryService } from '@/services/cloudinary.service'
import { ProfileData } from '@/services/types/profile-data.interface'
import { UserService } from '@/services/user.service'

const Profile: FC<{ data: IProfileObject }> = ({ data }) => {
	const { push } = useRouter()

	const { logout } = useActions()

	const queryCache = useQueryClient()

	const [isEdited, setIsEdited] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	const [type, setType] = useState<'profile' | 'changePassword'>('profile')

	const isProfile = type === 'profile'

	const {
		register: formRegister,
		getValues,
		setValue,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<ProfileData>({
		mode: 'onChange',
		defaultValues: {
			phone: data.phone,
			lastName: data.lastName,
			firstName: data.firstName,
			avatarPath: data.avatarPath
		}
	})

	const [image, setImage] = useState(getValues('avatarPath'))

	useEffect(() => {
		const countryCode = !getValues('phone').includes('+380') ? '+380' : ''
		const phoneNumber = getValues('phone').includes('+380')
			? getValues('phone')
			: ''

		setValue('phone', `${countryCode + phoneNumber}`)
	}, [watch('phone')])

	const onSubmit: SubmitHandler<ProfileData> = async data => {
		setIsLoading(true)

		if (isProfile)
			UserService.updateProfile(data)
				.then(() => {
					setIsLoading(false)
					queryCache.invalidateQueries(['get profile'])
					toast.success('Профіль оновлено!')
				})
				.catch(error => {
					setIsLoading(false)
					setError(catchErrorMessage(error))
				})
		else
			UserService.changePassword(data)
				.then(() => {
					setIsLoading(false)
					reset()
					queryCache.invalidateQueries(['get profile'])
					toast.success('Пароль змінено!')
				})
				.catch(error => {
					setIsLoading(false)
					setError(catchErrorMessage(error))
				})
	}

	const handleImageChange = (file: Blob) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			if (reader.result) setImage(reader.result.toString())
		}

		reader.readAsDataURL(file)
	}

	useEffect(() => {
		const files = getValues('avatarPath')

		if (typeof files[0] === 'object') {
			const file = new Blob([files[0]])

			if (file.size >= 2000000) toast.error('Розмір зображення занадто великий')
			else handleImageChange(file)
		}
	}, [watch('avatarPath')])

	useEffect(() => {
		if (getValues('avatarPath') !== image) {
			setIsLoading(true)

			CloudinaryService.uploadUserImage(image)
				.then(response => {
					setIsLoading(false)

					const imageUrl = configImageUrl(
						response.data.version,
						response.data.public_id,
						response.data.format,
						'user'
					)

					setValue('avatarPath', imageUrl)
					toast.success('Зображення завантажено!')
				})
				.catch(() => {
					setIsLoading(false)
					toast.error('Не вдалося завантажити зображення')
				})
		}
	}, [image])

	useEffect(() => {
		setError('')
		if (
			getValues('phone') !== data.phone ||
			getValues('lastName') !== data.lastName ||
			getValues('firstName') !== data.firstName ||
			getValues('avatarPath') !== data.avatarPath
		)
			setIsEdited(true)
		else setIsEdited(false)
	}, [
		data,
		watch('phone'),
		watch('lastName'),
		watch('firstName'),
		watch('avatarPath')
	])

	useEffect(() => {
		setError('')
	}, [watch('password'), watch('newPassword')])

	return (
		<>
			<div className={styles.image}>
				<Image
					draggable={false}
					src={
						typeof getValues('avatarPath') === 'string'
							? getValues('avatarPath')
							: '/images/config-loading.gif'
					}
					alt=''
					layout='fill'
					objectFit='cover'
					priority
				/>
			</div>
			<div className={styles.title}>
				<Text color='accent' size='subheading-large'>
					{isProfile ? 'Раді бачити,' : 'Бажаєте змінити'}
				</Text>
				<Text
					color={isProfile ? 'accent-dark' : 'accent'}
					size='subheading-large'
				>
					{isProfile ? `${data.firstName}!` : 'пароль?'}
				</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isProfile && (
					<>
						<Field
							{...formRegister('phone', {
								required: 'Номер телефону не вказано',
								pattern: {
									value: /^\+38(0\d{9})$/,
									message: 'Недійсний номер телефону'
								}
							})}
							className={styles.field}
							type='tel'
							title='Номер телефону'
							autoComplete='tel'
							placeholder={data.phone}
							error={
								errors.phone?.message ||
								(error.includes('Номер телефону') ? error : '')
							}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('lastName', {
								required: 'Прізвище не вказано',
								pattern: {
									value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/,
									message:
										'Прізвище повинно починатися з великої літери, містити лише українські літери та бути без пробілів'
								},
								minLength: {
									value: 3,
									message: 'Прізвище має бути не коротшим за 3 символи'
								},
								maxLength: {
									value: 19,
									message: 'Прізвище має бути не довшим за 19 символів'
								}
							})}
							className={styles.field}
							type='text'
							title='Прізвище'
							autoComplete='family-name'
							placeholder={data.lastName}
							error={errors.lastName?.message}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('firstName', {
								required: "Ім'я не вказано",
								pattern: {
									value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/,
									message:
										"Ім'я повинно починатися з великої літери, містити лише українські літери та бути без пробілів"
								},
								minLength: {
									value: 2,
									message: "Ім'я має бути не коротшим за 2 символи"
								},
								maxLength: {
									value: 12,
									message: "Ім'я має бути не довшим за 12 символів"
								}
							})}
							className={styles.field}
							type='text'
							title="Ім'я"
							autoComplete='given-name'
							placeholder={data.firstName}
							error={errors.firstName?.message}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('avatarPath')}
							className={styles.field}
							type='file'
							accept='.jpg, .jpeg, .png, .gif, .webp'
							title='Зображення аватарки'
							error={error.includes('зображення аватарки') ? error : ''}
							disabled={isLoading}
						/>
					</>
				)}
				{!isProfile && (
					<>
						<input
							readOnly
							hidden
							name='username'
							type='text'
							autoComplete='username'
						/>
						<Field
							{...formRegister('password', {
								required: 'Пароль не вказано',
								pattern: {
									value: /^[^\s]+(\s+[^\s]+)*$/,
									message:
										'Пароль не повинен починатися або закінчуватися пробілом'
								},
								minLength: {
									value: 8,
									message: 'Пароль має бути не коротшим за 8 символів'
								},
								maxLength: {
									value: 16,
									message: 'Пароль має бути не довшим за 16 символів'
								}
							})}
							className={styles.field}
							type='password'
							title='Пароль'
							autoComplete='current-password'
							placeholder='****************'
							error={
								errors.password?.message ||
								(!error.includes('Новий пароль') ? error : '')
							}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('newPassword', {
								required: 'Новий пароль не вказано',
								pattern: {
									value: /^[^\s]+(\s+[^\s]+)*$/,
									message:
										'Новий пароль не повинен починатися або закінчуватися пробілом'
								},
								validate: (value: string) => {
									if (
										!validator.isStrongPassword(value, {
											minLowercase: 1,
											minUppercase: 0,
											minNumbers: 1,
											minSymbols: 0
										})
									) {
										return 'Новий пароль недостатньо надійний (принаймні 1 мала літера англійського алфавіту та 1 цифра)'
									}
								},
								minLength: {
									value: 8,
									message: 'Новий пароль має бути не коротшим за 8 символів'
								},
								maxLength: {
									value: 16,
									message: 'Новий пароль має бути не довшим за 16 символів'
								}
							})}
							className={styles.field}
							type='password'
							title='Новий пароль'
							autoComplete='new-password'
							placeholder='****************'
							error={
								errors.newPassword?.message ||
								(error.includes('Новий пароль') ? error : '')
							}
							disabled={isLoading}
						/>
						<Field
							{...formRegister('confirmNewPassword', {
								required: 'Повторіть, будь ласка, новий пароль',
								validate: (value: string) => {
									if (watch('newPassword') !== value) {
										return 'Паролі не співпадають'
									}
								}
							})}
							className={styles.field}
							type='password'
							title='Повторіть новий пароль'
							autoComplete='new-password'
							placeholder='****************'
							error={errors.confirmNewPassword?.message}
							disabled={isLoading}
						/>
					</>
				)}
				<div>
					<Button
						className={styles.button}
						type='submit'
						rounder
						disabled={isLoading || (isProfile && !isEdited) || !!error}
					>
						{isLoading ? (
							<Triangle height={45} width={45} color={COLORS.accentDark} />
						) : isProfile ? (
							'Зберегти зміни'
						) : (
							'Підтвердити'
						)}
					</Button>
					<Button
						className={styles.button}
						onClick={() => {
							setError('')
							setType(isProfile ? 'changePassword' : 'profile')
						}}
						type='button'
						rounder
						bordered
						disabled={isLoading}
					>
						{isProfile ? 'Змінити пароль' : 'Редагувати профіль'}
					</Button>
					{data.role === EnumUserRole.ADMIN && (
						<Button
							className={styles.button}
							onClick={() => push(PAGES.admin)}
							type='button'
							rounder
							bordered
							disabled={isLoading}
						>
							Адмін панель
						</Button>
					)}
					<Button
						className={styles.button}
						onClick={() => logout()}
						type='button'
						rounder
						bordered
						disabled={isLoading}
					>
						Вийти з профілю
					</Button>
				</div>
			</form>
		</>
	)
}

export default Profile
