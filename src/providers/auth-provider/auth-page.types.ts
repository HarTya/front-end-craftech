import { NextPage } from 'next'

export type Roles = {
	isOnlyUser?: boolean
	isOnlyAdmin?: boolean
}

export type NextPageAuth<P = {}> = NextPage<P> & Roles

export type ComponentAuthFields = { Component: Roles }
