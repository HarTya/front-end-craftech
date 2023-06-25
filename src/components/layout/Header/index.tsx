import clsx from 'clsx'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { FC, useState } from 'react'

import Text from '@/ui/Text'
import FavoriteIcon from '@/ui/icons/Favorite/FavoriteIcon'
import MenuIcon from '@/ui/icons/Menu/MenuIcon'
import UserIcon from '@/ui/icons/User/UserIcon'

import { PAGES } from '@/config/pages.config'

import { useAuth } from '@/hooks/useAuth'

import Cart from './Cart'
import styles from './Header.module.scss'
import Search from './Search'
import User from './User'

const Header: FC = () => {
	const { user } = useAuth()

	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<header className={styles.main}>
			<Link href={PAGES.home} className={styles.logo}>
				<Image
					src='/images/logo-rectangle.png'
					alt='CRAFTECH'
					width={285}
					height={50}
					quality={100}
					priority
				/>
			</Link>
			<Search />
			<div onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.menu}>
				<MenuIcon />
			</div>
			<nav
				className={clsx(styles.nav, {
					[styles.nav_open]: isMenuOpen
				})}
			>
				<div className={styles.nav_item}>
					<Search />
				</div>
				<Link href={PAGES.favorites} className={styles.nav_item}>
					<FavoriteIcon />
					<Text size='body-medium' weight='semibold'>
						Улюблене
					</Text>
				</Link>
				<Cart className={styles.nav_item} />
				<Link
					href={user ? PAGES.profile : PAGES.auth}
					className={styles.nav_item}
				>
					{user ? <User /> : <UserIcon />}
					<Text size='body-medium' weight='semibold'>
						Профіль
					</Text>
				</Link>
			</nav>
		</header>
	)
}

export default Header
