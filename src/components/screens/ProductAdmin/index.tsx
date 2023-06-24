import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Triangle } from 'react-loader-spinner'
import { toast } from 'react-toastify'

import Button from '@/ui/Button'
import Field from '@/ui/Field'
import FieldTextArea from '@/ui/FieldTextArea'
import Select from '@/ui/Select'
import Text from '@/ui/Text'
import ArrowIconLeft from '@/ui/icons/Arrow/ArrowIconLeft'

import { configImageUrl } from '@/config/cloudinary.config'
import { PAGES } from '@/config/pages.config'
import { COLORS } from '@/config/variables.config'

import { ICategoryObject } from '@/types/category.interface'
import { IProductObjectFullset } from '@/types/product.interface'
import { ISubcategoryObject } from '@/types/subcategory.interface'

import { catchErrorMessage } from '@/api/api.helper'

import Gallery from '../Product/Gallery'

import Characteristics from './Characteristics'
import DeleteProduct from './DeleteProduct'
import styles from './ProductAdmin.module.scss'
import { CloudinaryService } from '@/services/cloudinary.service'
import { ProductService } from '@/services/product.service'
import { IProductData } from '@/services/types/product-data.interface'

const ProductAdmin: FC<{
	data: IProductObjectFullset
	categories: ICategoryObject[]
}> = ({ data, categories }) => {
	const productId = data.id

	const { push } = useRouter()

	const queryCache = useQueryClient()

	const [isEdited, setIsEdited] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const [error, setError] = useState('')

	const [isCategorySelectError, setIsCategorySelectError] = useState(false)
	const [isSubcategorySelectError, setIsSubcategorySelectError] =
		useState(false)

	const [selectedCategory, setSelectedCategory] = useState('')

	const [subcategories, setSubcategories] = useState([] as ISubcategoryObject[])
	const [selectedSubcategory, setSelectedSubcategory] = useState('')

	const {
		register: formRegister,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<IProductData>({
		mode: 'onChange',
		defaultValues: {
			name: data.name,
			description: data.description,
			price: data.price,
			status: data.status,
			images: data.images,
			sizes: data.sizes
		}
	})

	useEffect(() => {
		if (selectedCategory) {
			const category = categories.find(
				category => category.name === selectedCategory
			)

			if (category)
				setSubcategories(
					category.subcategories.filter(subcategory => subcategory.name)
				)
		}
	}, [selectedCategory])

	const [images, setImages] = useState(getValues('images'))
	const [newImage, setNewImage] = useState('')

	const onSubmit: SubmitHandler<IProductData> = data => {
		setIsLoading(true)

		data.price = +data.price

		data.images = images

		const categoryId = categories.find(
			category => category.name === selectedCategory
		)?.id

		if (categoryId) data.categoryId = categoryId
		else {
			setIsLoading(false)
			setIsCategorySelectError(true)
			toast.error('Будь ласка, оберіть категорію')
			return
		}

		const subcategoryId = subcategories.find(
			subcategory => subcategory.name === selectedSubcategory
		)?.id

		if (subcategoryId) data.subcategoryId = subcategoryId
		else {
			setIsLoading(false)
			setIsSubcategorySelectError(true)
			toast.error('Будь ласка, оберіть підкатегорію')
			return
		}

		ProductService.updateProduct(productId, data)
			.then(() => {
				setIsLoading(false)
				queryCache.invalidateQueries(['get product admin'])
				toast.success('Товар оновлено!')
			})
			.catch(error => {
				setIsLoading(false)
				setError(catchErrorMessage(error))
			})
	}

	const handleNewImage = (file: Blob) => {
		const reader = new FileReader()

		reader.onloadend = () => {
			if (reader.result) setNewImage(reader.result.toString())
		}

		reader.readAsDataURL(file)
	}

	useEffect(() => {
		const files = getValues('images')

		if (typeof files[files.length - 1] === 'object') {
			const file = new Blob([files[files.length - 1]])

			if (file.size >= 3000000)
				toast.error('Розмір нового зображення товару занадто великий')
			else handleNewImage(file)
		}
	}, [watch('images')])

	const [isScroll, setIsScroll] = useState(false)

	useEffect(() => {
		if (newImage) {
			setIsLoading(true)

			CloudinaryService.uploadProductImage(newImage)
				.then(response => {
					setIsLoading(false)
					setNewImage('')

					const imageUrl = configImageUrl(
						response.data.version,
						response.data.public_id,
						response.data.format,
						'product'
					)

					setImages([...images, `${imageUrl}`])
					setIsScroll(true)
					setTimeout(() => setIsScroll(false), 1000)
					setValue('images', images)
					toast.success('Нове зображення товару завантажено!')
				})
				.catch(() => {
					setIsLoading(false)
					setNewImage('')
					toast.error('Не вдалося завантажити нове зображення товару')
				})
		}
	}, [newImage])

	useEffect(() => {
		setError('')
		if (
			getValues('name').trim() !== data.name ||
			getValues('description').trim() !== data.description ||
			+getValues('price') !== data.price ||
			getValues('status').trim() !== data.status ||
			JSON.stringify(images) !== JSON.stringify(data.images) ||
			getValues('sizes').trim() !== data.sizes ||
			(selectedCategory
				? selectedCategory !== data.category?.name
				: selectedCategory) ||
			(selectedSubcategory
				? selectedSubcategory !== data.subcategory?.name
				: selectedSubcategory)
		)
			setIsEdited(true)
		else setIsEdited(false)
	}, [
		data,
		watch('name'),
		watch('description'),
		watch('price'),
		watch('status'),
		images,
		watch('sizes'),
		selectedCategory,
		selectedSubcategory
	])

	return (
		<>
			<div className={styles.title}>
				<div className={styles.back} onClick={() => push(PAGES.admin)}>
					<Button rounder hover>
						<ArrowIconLeft />
					</Button>
				</div>
				<Text size='subheading-large' color='accent'>
					{!data.name ? 'Новий товар' : `Товар - ${data.name}`}
				</Text>
				{!!images?.length && (
					<Gallery
						images={images}
						isScroll={isScroll}
						productId={productId}
						setImages={setImages}
					/>
				)}
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<Field
					{...formRegister('images')}
					className={styles.field}
					type='file'
					accept='.jpg, .jpeg, .png, .gif, .webp'
					title='Зображення товару'
					error={error.includes('зображення') ? error : ''}
					disabled={isLoading}
				/>
				<div className={styles.select}>
					<Text size='body' color='accent-dark' nowrap>
						Категорія
					</Text>
					<Select
						placeholder='Оберіть категорію'
						activeOption={data.category?.name}
						emptyMessage='Категорії відсутні'
						options={categories.map(category => category.name)}
						setSelectedOptionForeign={setSelectedCategory}
						error={isCategorySelectError}
						setError={setIsCategorySelectError}
						disabled={isLoading}
					/>
				</div>
				{selectedCategory && (
					<div className={styles.select}>
						<Text size='body' color='accent-dark' nowrap>
							Підкатегорія
						</Text>
						<Select
							placeholder='Оберіть підкатегорію'
							activeOption={data.subcategory?.name}
							emptyMessage='Підкатегорії відсутні'
							options={subcategories.map(subcategory => subcategory.name)}
							setSelectedOptionForeign={setSelectedSubcategory}
							error={isSubcategorySelectError}
							setError={setIsSubcategorySelectError}
							disabled={isLoading}
						/>
					</div>
				)}
				<Field
					{...formRegister('name', {
						required: 'Назву товару не вказано',
						minLength: {
							value: 4,
							message: 'Назва товару має бути не коротшою за 4 символи'
						},
						maxLength: {
							value: 100,
							message: 'Назва товару має бути не довшою за 100 символів'
						}
					})}
					className={styles.field}
					title='Назва товару'
					autoComplete='off'
					placeholder={!data.name ? 'Новий товар' : data.name}
					error={
						errors.name?.message ||
						(error.toLowerCase().includes('назв') ? error : '') ||
						(error.includes('не знайдено') ? error : '')
					}
					disabled={isLoading}
				/>
				<FieldTextArea
					{...formRegister('description', {
						required: 'Опис товару не вказано',
						minLength: {
							value: 10,
							message: 'Опис товару має бути не коротшим за 10 символів'
						},
						maxLength: {
							value: 5000,
							message: 'Опис товару має бути не довшим за 5000 символів'
						}
					})}
					className={styles.field}
					title='Опис товару'
					autoComplete='off'
					placeholder={data.description}
					error={
						errors.description?.message ||
						(error.includes('Опис товару') ? error : '')
					}
					disabled={isLoading}
				/>
				<Field
					{...formRegister('price', {
						required: 'Вартість товару не вказано',
						min: {
							value: 1,
							message: 'Вартість товару не повинна бути менше 1 гривні'
						},
						max: {
							value: 99999,
							message: 'Вартість товару не повинна перевищувати 99999 гривень'
						}
					})}
					className={styles.field}
					type='number'
					title='Вартість товару'
					autoComplete='off'
					placeholder={String(data.price)}
					error={errors.price?.message}
					disabled={isLoading}
				/>
				<Field
					{...formRegister('status', {
						required: 'Статус товару не вказано',
						minLength: {
							value: 5,
							message: 'Статус товару має бути не коротшим за 5 символів'
						},
						maxLength: {
							value: 15,
							message: 'Статус товару має бути не довшим за 15 символів'
						}
					})}
					className={styles.field}
					title='Статус товару'
					autoComplete='off'
					placeholder={data.status}
					error={
						errors.status?.message ||
						(error.includes('Статус товару') ? error : '')
					}
					disabled={isLoading}
				/>
				<Field
					{...formRegister('sizes', {
						required: 'Перелік розмірів не вказано',
						minLength: {
							value: 8,
							message: 'Перелік розмірів має бути не коротшим за 8 символів'
						}
					})}
					className={styles.field}
					title='Перелік розмірів'
					autoComplete='off'
					placeholder={data.sizes}
					error={
						errors.sizes?.message ||
						(error.includes('Перелік розмірів') ? error : '')
					}
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
			<Characteristics productId={productId} data={data.characteristics} />
			<DeleteProduct productId={productId} />
		</>
	)
}

export default ProductAdmin
