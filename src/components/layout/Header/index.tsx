import clsx from 'clsx'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import Text from '@/ui/Text'
import FavoriteIcon from '@/ui/icons/Favorite/FavoriteIcon'
import MenuIcon from '@/ui/icons/Menu/MenuIcon'
import UserIcon from '@/ui/icons/User/UserIcon'

import { PAGES } from '@/config/pages.config'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useMenu } from '@/hooks/useMenu'

import Cart from './Cart'
import styles from './Header.module.scss'
import Search from './Search'
import User from './User'

const Header: FC = () => {
	const { asPath } = useRouter()

	const { user } = useAuth()

	const { isMenuOpen } = useMenu()
	const { toggleMenu, closeMenu } = useActions()

	useEffect(() => {
		closeMenu()
	}, [asPath])

	return (
		<>
			{isMenuOpen && (
				<style jsx global>{`
					body {
						overflow-y: hidden;
					}
				`}</style>
			)}
			<header className={styles.main}>
				<Link
					href={PAGES.home}
					className={clsx(styles.logo, {
						[styles.disabled]: asPath === PAGES.home
					})}
				>
					<Image
						src='/images/logo-rectangle.png'
						alt='CRAFTECH'
						layout='fill'
						objectFit='cover'
						quality={100}
						priority
					/>
				</Link>
				<div onClick={() => toggleMenu()} className={styles.menu}>
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
					<Link
						href={PAGES.favorites}
						className={clsx(styles.nav_item, {
							[styles.nav_item_disabled]: asPath === PAGES.favorites
						})}
					>
						<FavoriteIcon />
						<Text
							size='body-medium'
							color='accent-dark'
							weight='semibold'
							nowrap
						>
							Улюблене
						</Text>
					</Link>
					<Cart className={styles.nav_item} />
					<Link
						href={user ? PAGES.profile : PAGES.auth}
						className={clsx(styles.nav_item, {
							[styles.nav_item_disabled]:
								asPath === PAGES.profile || asPath === PAGES.auth
						})}
					>
						{user ? <User /> : <UserIcon />}
						<Text
							size='body-medium'
							color='accent-dark'
							weight='semibold'
							nowrap
						>
							Профіль
						</Text>
					</Link>
				</nav>
			</header>
		</>
	)
}

export default Header
