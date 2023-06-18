import Image from 'next/legacy/image'
import Link from 'next/link'
import { FC } from 'react'

import FavoriteIcon from '@/ui/icons/Favorite/FavoriteIcon'
import UserIcon from '@/ui/icons/User/UserIcon'

import { PAGES } from '@/config/pages.config'

import { useAuth } from '@/hooks/useAuth'

import Cart from './Cart'
import styles from './Header.module.scss'
import Search from './Search'
import User from './User'

const Header: FC = () => {
	const { user } = useAuth()

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
			<nav className={styles.nav}>
				<Link href={PAGES.favorites} className={styles.nav_item}>
					<FavoriteIcon />
				</Link>
				<Cart className={styles.nav_item} />
				<Link
					href={user ? PAGES.profile : PAGES.auth}
					className={styles.nav_item}
				>
					{user ? <User /> : <UserIcon />}
				</Link>
			</nav>
		</header>
	)
}

export default Header
