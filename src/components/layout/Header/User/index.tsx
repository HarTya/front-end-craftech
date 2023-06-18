import Image from 'next/legacy/image'
import { FC } from 'react'

import { useProfile } from '@/hooks/useProfile'

import styles from './User.module.scss'

const User: FC = () => {
	const { profile } = useProfile()

	return (
		<div className={styles.image}>
			{profile && (
				<Image
					draggable={false}
					src={profile.avatarPath}
					alt=''
					layout='fill'
					objectFit='cover'
					placeholder='blur'
					blurDataURL={profile.avatarPath}
				/>
			)}
		</div>
	)
}

export default User
