/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Admins = "admins",
	Notes = "notes",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AdminsRecord = {

}

export type NotesRecord = {
	author: string
	body: string
	x?: number
	y?: string
	theme?: string
}

export type UsersRecord = {
	name: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AdminsResponse = AdminsRecord & AuthSystemFields
export type NotesResponse = NotesRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	admins: AdminsRecord
	notes: NotesRecord
	users: UsersRecord
}