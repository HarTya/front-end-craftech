export const configImageUrl = (
	version: number,
	public_id: string,
	format: string,
	transformation_type?: 'user' | 'product'
) => {
	return `https://res.cloudinary.com/craftech/image/upload${
		transformation_type === 'user'
			? '/w_500,c_fill,ar_1:1,g_auto,r_max'
			: transformation_type === 'product'
			? '/c_fill,w_700,h_700'
			: ''
	}/v${version}/${public_id}.${format}`
}
