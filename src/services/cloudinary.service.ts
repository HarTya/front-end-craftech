import axios from 'axios'

const url = 'https://api.cloudinary.com/v1_1/craftech/image/upload'
const userUploadPreset = `${process.env.USER_UPLOAD_PRESET}`
const productUploadPreset = `${process.env.PRODUCT_UPLOAD_PRESET}`

export const CloudinaryService = {
	async uploadUserImage(image: string) {
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', userUploadPreset)

		return axios.post(url, formData)
	},

	async uploadProductImage(image: string) {
		const formData = new FormData()
		formData.append('file', image)
		formData.append('upload_preset', productUploadPreset)

		return axios.post(url, formData)
	}
}
