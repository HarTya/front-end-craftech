import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect } from 'react'

import Text from '@/ui/Text'
import FacebookIcon from '@/ui/icons/Social/FacebookIcon'
import InstagramIcon from '@/ui/icons/Social/InstagramIcon'
import TikTokIcon from '@/ui/icons/Social/TikTokIcon'

import { PAGES } from '@/config/pages.config'

import { useOutside } from '@/hooks/useOutside'
import { useViewportWidth } from '@/hooks/useViewportWidth'

import { ISubcategoryObject } from '@/types/subcategory.interface'

import Categories from './Categories'
import styles from './Sidebar.module.scss'
import Subcategories from './Subcategories'

const Sidebar: FC<{
	setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
	pin: boolean
	subcategories?: ISubcategoryObject[]
}> = ({ setIsSidebarOpen, pin, subcategories }) => {
	const { asPath } = useRouter()
	const { viewportWidth } = useViewportWidth()

	const { isOpen, setIsOpen, ref } = useOutside(false)

	useEffect(() => {
		setIsOpen(pin)
	}, [pin])

	useEffect(() => {
		if (!isOpen && setIsSidebarOpen) setIsSidebarOpen(false)
	}, [isOpen])

	return (
		<aside
			ref={ref}
			className={clsx(styles.aside, {
				[styles.aside_pin]: viewportWidth <= 796 ? (!isOpen ? false : pin) : pin
			})}
		>
			<div className={styles.title}>
				<Text size='body-large' topline>
					{subcategories ? 'Підкатегорії' : 'Категорії'}
				</Text>
			</div>
			{subcategories ? <Subcategories data={subcategories} /> : <Categories />}
			{asPath !== PAGES.admin ? (
				<>
					<div className={styles.social}>
						<Text size='body'>Ми у соціальних мережах</Text>
						<div>
							<Link
								href='https://www.instagram.com/'
								target='_blank'
								className={styles.link}
							>
								<InstagramIcon />
							</Link>
							<Link
								href='https://www.facebook.com/'
								target='_blank'
								className={styles.link}
							>
								<FacebookIcon />
							</Link>
							<Link
								href='https://www.tiktok.com/'
								target='_blank'
								className={styles.link}
							>
								<TikTokIcon />
							</Link>
						</div>
					</div>
					<div className={styles.info}>
						<Text size='body'>Інформація про компанію</Text>
						<div>
							<Text size='body'>+380 68 372 73 83</Text>
						</div>
					</div>
					<div className={styles.copyright}>
						<Text size='body'>Cлава Україні! Героям Слава!</Text>
						<Text size='body'>2014-2023 CRAFTECH</Text>
						<Text size='body'>All rights reserved</Text>
					</div>
				</>
			) : (
				<>
					<Link href={PAGES.reviews} className={styles.admin}>
						<Text size='body-large'>Відгуки</Text>
					</Link>
					<Link href={PAGES.statistics} className={styles.admin}>
						<Text size='body-large'>Статистика</Text>
					</Link>
				</>
			)}
		</aside>
	)
}

export default Sidebar
