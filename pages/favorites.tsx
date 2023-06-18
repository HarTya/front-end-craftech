import Layout from '@/layout/Layout'

import Catalog from '@/ui/catalog/Catalog'

import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

import { PAGES } from '@/config/pages.config'

import { useProfile } from '@/hooks/useProfile'

const FavoritesPage: NextPageAuth = () => {
	const { profile, isLoading } = useProfile()

	return (
		<Layout title='Улюблене'>
			<Catalog
				title='Улюблене'
				backUrl={PAGES.home}
				data={{ products: profile?.favorites || [] }}
				isLoading={isLoading}
			/>
		</Layout>
	)
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
