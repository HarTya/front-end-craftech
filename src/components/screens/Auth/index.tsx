import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import validator from 'validator'

import Layout from '@/layout/Layout'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import Text from '@/ui/Text'

import { COLORS } from '@/config/variables.config'

import {
	AuthorizationData,
	AuthorizationType
} from '@/store/user/user.interface'
import { clearError } from '@/store/user/user.slice'

import { useActions } from '@/hooks/useActions'
import { useAuth, useAuthRedirect } from '@/hooks/useAuth'

import { EnumAuthorizationType } from '@/api/api.enum'

import styles from './Auth.module.scss'

const Auth: FC = () => {
	useAuthRedirect()

	const dispatch = useDispatch()

	const { authorization } = useActions()

	const { isLoading, error } = useAuth()

	const [type, setType] = useState<AuthorizationType>(
		EnumAuthorizationType.LOGIN
	)

	const isLogin = type === EnumAuthorizationType.LOGIN

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<AuthorizationData>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<AuthorizationData> = async data => {
		authorization({ type, data })
	}

	useEffect(() => {
		dispatch(clearError())
	}, [type, watch('phone'), isLogin && watch('password')])

	return (
		<Layout title='Авторизація'>
			<section className={styles.section}>
				<Text className={styles.text} color='accent' size='subheading-large'>
					{isLogin
						? 'Раді бачити!'
						: 'Вперше у нас? Зареєструйся та отримуй -10%'}
				</Text>
				<Text className={styles.text} color='accent' size='subheading-large'>
					{isLogin ? 'Увійдіть у свій профіль' : 'знижки на перше замовлення'}
				</Text>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					<Field
						{...formRegister('phone', {
							required: 'Номер телефону не вказано',
							pattern: {
								value: /^0\d{9}$/,
								message: 'Недійсний номер телефону'
							}
						})}
						className={styles.field}
						type='tel'
						title='Номер телефону'
						autoComplete='tel'
						placeholder='0123456789'
						error={errors.phone?.message || error}
						prefix='+38'
						disabled={isLoading}
					/>
					<Field
						{...formRegister('password', {
							required: 'Пароль не вказано',
							pattern: {
								value: /^[^\s]+(\s+[^\s]+)*$/,
								message:
									'Пароль не повинен починатися або закінчуватися пробілом'
							},
							validate: (value: string) => {
								if (
									!isLogin &&
									!validator.isStrongPassword(value, {
										minLowercase: 1,
										minUppercase: 0,
										minNumbers: 1,
										minSymbols: 0
									})
								) {
									return 'Пароль недостатньо надійний (принаймні 1 мала літера англійського алфавіту та 1 цифра)'
								}
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
						error={errors.password?.message || (isLogin && error)}
						disabled={isLoading}
					/>
					{!isLogin && (
						<>
							<Field
								{...formRegister('confirmPassword', {
									required: 'Повторіть, будь ласка, пароль',
									validate: (value: string) => {
										if (watch('password') !== value) {
											return 'Паролі не співпадають'
										}
									}
								})}
								className={styles.field}
								type='password'
								title='Повторіть пароль'
								autoComplete='current-password'
								placeholder='****************'
								error={errors.confirmPassword?.message}
								disabled={isLoading}
							/>
							<Field
								{...formRegister('lastName', {
									required: 'Прізвище не вказано',
									pattern: {
										value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/,
										message:
											'Прізвище повинно починатися з великої літери, містити лише українські символи та бути без пробілів'
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
								placeholder='Бандера'
								error={errors.lastName?.message}
								disabled={isLoading}
							/>
							<Field
								{...formRegister('firstName', {
									required: "Ім'я не вказано",
									pattern: {
										value: /^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії']*$/,
										message:
											"Ім'я повинно починатися з великої літери, містити лише українські символи та бути без пробілів"
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
								placeholder='Степан'
								error={errors.firstName?.message}
								disabled={isLoading}
							/>
						</>
					)}
					<div>
						<Button
							className={styles.button}
							type='submit'
							rounder
							disabled={isLoading || !!error}
						>
							{isLoading ? (
								<Triangle height={45} width={45} color={COLORS.accentDark} />
							) : isLogin ? (
								'Увійти'
							) : (
								'Зареєструватись'
							)}
						</Button>
						<Button
							className={styles.button}
							onClick={() =>
								setType(
									isLogin
										? EnumAuthorizationType.REGISTER
										: EnumAuthorizationType.LOGIN
								)
							}
							type='button'
							rounder
							bordered
							disabled={isLoading}
						>
							{isLogin ? 'Зареєструватись' : 'Увійти'}
						</Button>
					</div>
				</form>
			</section>
		</Layout>
	)
}

export default Auth
