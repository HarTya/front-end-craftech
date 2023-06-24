export const PAGES = {
	home: '/',
	notFound: '/not-found',
	auth: '/auth',
	favorites: '/favorites',
	profile: '/profile',
	admin: '/admin',
	reviews: '/reviews',
	statistics: '/statistics',
	thanks: '/thanks'
}

const DYNAMIC_PAGES = {
	product: '/product',
	category: '/category',
	subcategory: '/subcategory'
}

export const dynamicPageHref = (
	type: 'product' | 'category' | 'subcategory',
	slug: string
) => {
	return type === 'product'
		? DYNAMIC_PAGES.product + `/${slug}`
		: type === 'category'
		? DYNAMIC_PAGES.category + `/${slug}`
		: DYNAMIC_PAGES.subcategory + `/${slug}`
}

export const dynamicAdminPageHref = (
	type: 'product' | 'category' | 'subcategory',
	id: number
) => {
	return type === 'product'
		? DYNAMIC_PAGES.product + PAGES.admin + `/${id}`
		: type === 'category'
		? DYNAMIC_PAGES.category + PAGES.admin + `/${id}`
		: DYNAMIC_PAGES.subcategory + PAGES.admin + `/${id}`
}
