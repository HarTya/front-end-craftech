import clsx from 'clsx'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import {
	Dispatch,
	FC,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'

import Button from '@/ui/Button'

import { dynamicAdminPageHref } from '@/config/pages.config'

import styles from './Gallery.module.scss'

const Gallery: FC<{
	images: string[]
	productId?: number
	isScroll?: boolean
	setImages?: Dispatch<SetStateAction<string[]>>
}> = ({ images, productId, isScroll = false, setImages }) => {
	const { asPath } = useRouter()

	const isAdminPage =
		productId && asPath === dynamicAdminPageHref('product', productId)

	useEffect(() => {
		if (isScroll && isAdminPage) {
			if (ref.current) ref.current.scrollLeft = 100 * (images.length - 1)
			setActiveIndex(images.length - 1)
		}
	}, [isScroll])

	const [activeIndex, setActiveIndex] = useState(0)

	const ref = useRef<HTMLDivElement>(null)

	return (
		<div
			className={clsx(styles.main, {
				[styles.main_admin]: isAdminPage
			})}
		>
			<div className={styles.image}>
				<Image
					draggable={false}
					src={images[activeIndex]}
					alt=''
					layout='fill'
					objectFit='contain'
					quality={100}
					placeholder='blur'
					blurDataURL={images[activeIndex]}
				/>
				{isAdminPage && (
					<Button
						onClick={() => {
							if (setImages) {
								setActiveIndex(activeIndex > 0 ? activeIndex - 1 : activeIndex)
								setImages(images.filter((_, i) => i !== activeIndex))
							}
						}}
						className={styles.image_button}
						size='medium'
						rounder
						bordered={activeIndex !== 0}
						hover={activeIndex === 0}
					>
						{activeIndex}
					</Button>
				)}
			</div>
			<div className={styles.bottom} ref={ref}>
				{images.map((image, index) => (
					<div
						key={index}
						onClick={() => {
							if (ref.current)
								ref.current.scrollLeft =
									ref.current.scrollLeft >= 0 ? 100 * (index - 1) : 0
							setActiveIndex(index)
						}}
						className={clsx(styles.bottom_image, {
							[styles.bottom_image_active]: index === activeIndex
						})}
					>
						<Image
							draggable={false}
							src={image}
							alt=''
							layout='fill'
							objectFit='cover'
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default Gallery
