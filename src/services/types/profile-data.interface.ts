export interface IProfileData {
	phone: string
	lastName: string
	firstName: string
	avatarPath: string
}

export interface IPasswordData {
	password: string
	newPassword: string
	confirmNewPassword: string
}

export type ProfileData = IProfileData & IPasswordData
