import { TailSpin } from 'react-loader-spinner'

import Layout from '@/layout/Layout'

import Profile from '@/screens/Profile'
import styles from '@/screens/Profile/Profile.module.scss'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { COLORS } from '@/config/variables.config'

import { useActions } from '@/hooks/useActions'
import { useProfile } from '@/hooks/useProfile'

const ProfilePage: NextPageAuth = () => {
	const { profile, isLoading, isError } = useProfile()

	const { logout } = useActions()

	if (isError) {
		logout()
		return null
	}

	return (
		<Layout title='Профіль'>
			<section className={styles.section}>
				{isLoading ? (
					<TailSpin width={50} height={50} color={COLORS.accent} />
				) : (
					profile && <Profile data={profile} />
				)}
			</section>
		</Layout>
	)
}

ProfilePage.isOnlyUser = true

export default ProfilePage
