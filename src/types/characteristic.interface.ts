export interface ICharacteristicObject {
	id: number
	title: string
	description: string
}

export interface ICharacteristic {
	id: number
	createdAt: string
	updatedAt: string
	title: string
	description: string
	productId: number
	adminId: number
}
