/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		API_URL: process.env.API_URL,
		APP_URL: process.env.APP_URL,
		USER_UPLOAD_PRESET: process.env.USER_UPLOAD_PRESET,
		PRODUCT_UPLOAD_PRESET: process.env.PRODUCT_UPLOAD_PRESET
	},
	images: {
		domains: ['res.cloudinary.com']
	}
}

module.exports = nextConfig
