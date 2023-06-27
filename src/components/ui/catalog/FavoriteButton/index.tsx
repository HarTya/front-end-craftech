import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC } from 'react'
import { TailSpin } from 'react-loader-spinner'

import FavoriteIconAccent from '@/ui/icons/Favorite/FavoriteIconAccent'
import FavoriteIconAccentDark from '@/ui/icons/Favorite/FavoriteIconAccentDark'

import { COLORS } from '@/config/variables.config'

import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { useViewportWidth } from '@/hooks/useViewportWidth'

import { IFavoriteButton } from './FavoriteButton.interface'
import styles from './FavoriteButton.module.scss'
import { UserService } from '@/services/user.service'

const FavoriteButton: FC<IFavoriteButton> = ({
	productSlug,
	variant = 'accent',
	className
}) => {
	const { viewportWidth } = useViewportWidth()

	const { user } = useAuth()

	const { profile } = useProfile()

	const queryCache = useQueryClient()

	const { mutate, isLoading } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productSlug),
		{
			onSuccess() {
				queryCache.invalidateQueries(['get profile'])
			}
		}
	)

	if (!profile || !user || !productSlug) return null

	const isExists = profile?.favorites.some(
		favorite => favorite.slug === productSlug
	)

	return variant === 'accent' ? (
		isLoading ? (
			<TailSpin
				width={viewportWidth <= 575 ? 17 : 30}
				height={viewportWidth <= 575 ? 17 : 30}
				color={COLORS.accent}
			/>
		) : (
			<div className={clsx(styles.main, className)} onClick={() => mutate()}>
				{isExists ? <FavoriteIconAccent fill /> : <FavoriteIconAccent />}
			</div>
		)
	) : isLoading ? (
		<TailSpin
			wrapperClass={className}
			width={viewportWidth <= 575 ? 22 : 35}
			height={viewportWidth <= 575 ? 22 : 35}
			color={COLORS.accentDark}
		/>
	) : (
		<div className={clsx(styles.main, className)} onClick={() => mutate()}>
			{isExists ? <FavoriteIconAccentDark fill /> : <FavoriteIconAccentDark />}
		</div>
	)
}

export default FavoriteButton
