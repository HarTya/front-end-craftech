import { EnumEntitiesBaseUrl } from './api.enum'

export const getContentType = () => ({
	'Content-Type': 'application/json'
})

export const configUrl = (
	entityBaseUrl: EnumEntitiesBaseUrl,
	endpoint: string
) => entityBaseUrl + endpoint

export const catchErrorMessage = (error: any): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
