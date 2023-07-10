import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import FieldTextArea from '@/ui/FieldTextArea'
import Modal from '@/ui/Modal'
import Select from '@/ui/Select'
import Text from '@/ui/Text'
import ArrowIconDownLarge from '@/ui/icons/Arrow/ArrowIconDownLarge'
import CartIcon from '@/ui/icons/Cart/CartIcon'

import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { useOrders } from '@/hooks/useOrders'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { EnumOrderPickupType } from '@/types/order.interface'

import { formatToCurrency } from '@/utils/format-to-currency'

import { catchErrorMessage } from '@/api/api.helper'

import styles from './Cart.module.scss'
import CartItem from './CartItem'
import { OrderService } from '@/services/order.service'
import {
	IOrderData,
	IOrderUnauthorizedData
} from '@/services/types/order-data.interface'

const Cart: FC<{ className: string }> = ({ className }) => {
	const { push } = useRouter()

	const { isOpen, setIsOpen, ref } = useOutside(false)

	const [isModalOpen, setIsModalOpen] = useState(false)

	const { items, total } = useCart()

	const { reset } = useActions()

	const { discount } = useOrders()

	const [isPlaceOrder, setIsPlaceOrder] = useState(false)

	useEffect(() => {
		if (!isOpen) setIsPlaceOrder(false)
	}, [isOpen])

	const [isReadyToSubmit, setIsReadyToSubmit] = useState(false)

	useEffect(() => {
		if (isPlaceOrder) setIsReadyToSubmit(true)
		else setIsReadyToSubmit(false)
	}, [isPlaceOrder])

	const [isLoading, setIsLoading] = useState(false)

	const { profile, isLoading: isProfileLoading, isError } = useProfile()

	const { user } = useAuth()

	const [isAuth, setIsAuth] = useState(false)

	const [pickupType, setPickupType] = useState<EnumOrderPickupType>(
		EnumOrderPickupType.STORE
	)

	const [isDaySelectError, setIsDaySelectError] = useState(false)
	const [isTimeSelectError, setIsTimeSelectError] = useState(false)

	const [selectedDay, setSelectedDay] = useState('')
	const [selectedTime, setSelectedTime] = useState('')

	const {
		register: formRegister,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors }
	} = useForm<IOrderData & IOrderUnauthorizedData>({
		mode: 'onChange'
	})

	useEffect(() => {
		if (!isProfileLoading && !isError && profile && user) {
			setIsAuth(true)
			setValue('phone', profile.phone)
			setValue('lastName', profile.lastName)
			setValue('firstName', profile.firstName)
		}
	}, [profile, user])

	const onSubmit: SubmitHandler<
		IOrderData & IOrderUnauthorizedData
	> = async data => {
		setIsLoading(true)

		data.pickupType = pickupType

		if (selectedDay) data.day = selectedDay
		else if (pickupType !== EnumOrderPickupType.POST_OFFICE) {
			setIsLoading(false)
			setIsDaySelectError(true)
			toast.error('Будь ласка, оберіть день отримання замовлення')
			return
		}

		if (selectedTime) data.time = selectedTime
		else if (pickupType !== EnumOrderPickupType.POST_OFFICE) {
			setIsLoading(false)
			setIsTimeSelectError(true)
			toast.error('Будь ласка, оберіть час отримання замовлення')
			return
		}

		data.postOfficeNumber = +getValues('postOfficeNumber')
		data.items = items.map(item => ({
			size: item.size,
			quantity: item.quantity,
			price: Math.ceil(item.price * item.quantity),
			productId: item.product.id
		}))
		data.total = total

		if (isAuth)
			OrderService.placeOrder(data)
				.then(() => {
					setIsLoading(false)
					push(PAGES.thanks).then(() => reset())
				})
				.catch(error => {
					setIsLoading(false)
					toast.error(catchErrorMessage(error))
				})
		else
			OrderService.placeOrderUnauthorized(data)
				.then(() => {
					setIsLoading(false)
					push(PAGES.thanks).then(() => reset())
				})
				.catch(error => {
					setIsLoading(false)
					toast.error(catchErrorMessage(error))
				})
	}

	return (
		<>
			<div className={className} onClick={() => setIsModalOpen(true)}>
				{!!items.length && <Text size='body-small'>{items.length}</Text>}
				<CartIcon />
				<Text size='body-medium' color='accent-dark' weight='semibold' nowrap>
					Ваш кошик
				</Text>
			</div>
			{isModalOpen ? (
				<Modal
					setIsOpen={setIsModalOpen}
					title={isPlaceOrder ? 'Оформлення замовлення' : 'Ваш кошик'}
				>
					{items.length ? (
						<>
							<div className={styles.main}>
								<div className={styles.main_top}>
									{items.map(item => (
										<CartItem key={item.id} item={item} />
									))}
								</div>
								<div
									ref={ref}
									className={clsx(styles.main_bottom, {
										[styles.main_bottom_open]: isPlaceOrder
									})}
								>
									{isPlaceOrder ? (
										<span
											onClick={() => {
												setIsPlaceOrder(false)
												setIsOpen(false)
											}}
											className={styles.main_bottom_close}
										>
											<ArrowIconDownLarge color='accent-dark' />
										</span>
									) : (
										<></>
									)}
									{isPlaceOrder ? (
										<form
											id='place-order'
											onSubmit={handleSubmit(onSubmit)}
											className={styles.form}
										>
											<div>
												<div>
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
														error={errors.phone?.message}
														prefix='+38'
														readOnly={isAuth}
														disabled={isLoading || isProfileLoading}
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
																message:
																	'Прізвище має бути не коротшим за 3 символи'
															},
															maxLength: {
																value: 19,
																message:
																	'Прізвище має бути не довшим за 19 символів'
															}
														})}
														className={styles.field}
														type='text'
														title='Прізвище'
														autoComplete='family-name'
														placeholder='Бандера'
														error={errors.lastName?.message}
														readOnly={isAuth}
														disabled={isLoading || isProfileLoading}
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
																message:
																	"Ім'я має бути не коротшим за 2 символи"
															},
															maxLength: {
																value: 12,
																message:
																	"Ім'я має бути не довшим за 12 символів"
															}
														})}
														className={styles.field}
														type='text'
														title="Ім'я"
														autoComplete='given-name'
														placeholder='Степан'
														error={errors.firstName?.message}
														readOnly={isAuth}
														disabled={isLoading || isProfileLoading}
													/>
												</div>
												<div>
													<div className={styles.select}>
														<Text size='body' color='accent-dark' nowrap>
															Тип отримання замовлення
														</Text>
														<Select
															placeholder='Оберіть тип отримання замовлення'
															options={[
																'Самовивіз з магазину\nм. Запоріжжя',
																'Самовивіз з відділень\n"Нової пошти"'
															]}
															disableOptionNowrap
															pickupType={pickupType}
															setPickupType={setPickupType}
															disabled={isLoading}
														/>
													</div>
													{pickupType === EnumOrderPickupType.STORE ? (
														<>
															<div className={styles.select}>
																<Text size='body' color='accent-dark' nowrap>
																	День отримання замовлення
																</Text>
																<Select
																	placeholder='Оберіть день отримання замовлення'
																	options={[
																		'Понеділок',
																		'Вівторок',
																		'Середа',
																		'Четвер',
																		"П'ятниця",
																		'Субота',
																		'Неділя'
																	]}
																	optionLimit={3}
																	setSelectedOptionForeign={setSelectedDay}
																	error={isDaySelectError}
																	setError={setIsDaySelectError}
																	disabled={isLoading}
																/>
															</div>
															<div className={styles.select}>
																<Text size='body' color='accent-dark' nowrap>
																	Час отримання замовлення
																</Text>
																<Select
																	placeholder='Оберіть час отримання замовлення'
																	options={[
																		'12:00',
																		'12:30',
																		'13:00',
																		'13:30',
																		'14:00',
																		'14:30',
																		'15:00',
																		'15:30',
																		'16:00',
																		'16:30',
																		'17:00',
																		'17:30',
																		'18:00',
																		'18:30'
																	]}
																	optionLimit={3}
																	setSelectedOptionForeign={setSelectedTime}
																	error={isTimeSelectError}
																	setError={setIsTimeSelectError}
																	disabled={isLoading}
																/>
															</div>
														</>
													) : (
														<>
															<Field
																{...formRegister('city', {
																	required: 'Назву міста не вказано',
																	pattern: {
																		value:
																			/^[А-ЩЬЮЯҐЄІЇ][а-щьюяґєії' А-ЩЬЮЯҐЄІЇ]*$/,
																		message:
																			'Назва міста повинна починатися з великої літери та містити лише українські символи'
																	},
																	minLength: {
																		value: 2,
																		message:
																			'Назва міста має бути не коротшою за 2 символи'
																	},
																	maxLength: {
																		value: 30,
																		message:
																			'Назва міста має бути не довшою за 30 символів'
																	}
																})}
																className={styles.field}
																type='text'
																title='Назва міста'
																autoComplete='home city'
																placeholder='Бахмут'
																error={errors.city?.message}
																disabled={isLoading}
															/>
															<Field
																{...formRegister('postOfficeNumber', {
																	required:
																		'Номер відділення "Нової пошти" не вказано',
																	min: {
																		value: 1,
																		message:
																			'Нумерація відділень "Нової пошти" починається з 1'
																	},
																	max: {
																		value: 50000,
																		message:
																			'Номер відділення "Нової пошти" не повинен перевищувати 50000'
																	}
																})}
																className={styles.field}
																type='number'
																title='Номер відділення "Нової пошти"'
																autoComplete='off'
																placeholder='0'
																error={errors.postOfficeNumber?.message}
																prefix='№'
																disabled={isLoading}
															/>
														</>
													)}
												</div>
											</div>
											<FieldTextArea
												{...formRegister('comment')}
												className={clsx(styles.field, styles.textarea)}
												title='Коментар до замовлення (за бажанням)'
												autoComplete='off'
												placeholder='Як ми можемо вам допомогти?'
												disabled={isLoading}
											/>
										</form>
									) : (
										<></>
									)}
									<div>
										<div>
											<Text size='body-small' color='accent-dark'>
												Загальна вартість
											</Text>
											<Text color='accent'>{formatToCurrency(total)}</Text>
										</div>
										<Button
											onClick={() => {
												setIsPlaceOrder(true)
												setIsOpen(true)
											}}
											type={isReadyToSubmit ? 'submit' : 'button'}
											form='place-order'
											size='medium'
											disabled={
												isPlaceOrder &&
												(isLoading ||
													(pickupType === EnumOrderPickupType.STORE &&
														isDaySelectError) ||
													(pickupType === EnumOrderPickupType.STORE &&
														isTimeSelectError))
											}
										>
											{isPlaceOrder ? (
												isLoading ? (
													<Triangle
														height={45}
														width={45}
														color={COLORS.accentDark}
													/>
												) : (
													'Замовити'
												)
											) : (
												'Оформити замовлення'
											)}
										</Button>
									</div>
								</div>
							</div>
							{discount && (
								<div className={styles.discount}>
									<Text size='body-medium' color='accent-dark'>
										Діє знижка 10% на перше замовлення!
									</Text>
								</div>
							)}
						</>
					) : (
						<Text size='subheading-medium' color='accent-dark'>
							Товари відсутні
						</Text>
					)}
				</Modal>
			) : (
				<></>
			)}
		</>
	)
}

export default Cart
