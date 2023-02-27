/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Admins = "admins",
	Records = "records",
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

export enum RecordsLanguageOptions {
	"java" = "java",
	"cpp" = "cpp",
	"python" = "python",
	"javascript" = "javascript",
	"csharp" = "csharp",
	"php" = "php",
	"ruby" = "ruby",
	"perl" = "perl",
	"swift" = "swift",
	"golang" = "golang",
	"kotlin" = "kotlin",
	"scala" = "scala",
	"rlang" = "rlang",
	"bash" = "bash",
	"rust" = "rust",
	"objectivec" = "objectivec",
	"react" = "react",
	"angular" = "angular",
	"vue" = "vue",
	"ember" = "ember",
	"svelte" = "svelte",
	"clang" = "clang",
	"cobol" = "cobol",
	"fortran" = "fortran",
	"lisp" = "lisp",
	"pascal" = "pascal",
	"sql" = "sql",
	"typescript" = "typescript",
	"elixir" = "elixir",
	"erlang" = "erlang",
	"julia" = "julia",
	"haskell" = "haskell",
	"clojure" = "clojure",
	"ocaml" = "ocaml",
	"fsharp" = "fsharp",
	"webassembly" = "webassembly",
}
export type RecordsRecord = {
	time: number
	rating: number
	description?: string
	user: RecordIdString
	date: IsoDateString
	language: RecordsLanguageOptions
}

export type UsersRecord = {
	name: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AdminsResponse = AdminsRecord & AuthSystemFields
export type RecordsResponse<Texpand = unknown> = RecordsRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	admins: AdminsRecord
	records: RecordsRecord
	users: UsersRecord
}


export enum RecordsLanguageOptions {
	"java" = "java",
	"cpp" = "cpp",
	"python" = "python",
	"javascript" = "javascript",
	"csharp" = "csharp",
	"php" = "php",
	"ruby" = "ruby",
	"perl" = "perl",
	"swift" = "swift",
	"golang" = "golang",
	"kotlin" = "kotlin",
	"scala" = "scala",
	"rlang" = "rlang",
	"bash" = "bash",
	"rust" = "rust",
	"objectivec" = "objectivec",
	"react" = "react",
	"angular" = "angular",
	"vue" = "vue",
	"ember" = "ember",
	"svelte" = "svelte",
	"clang" = "clang",
	"cobol" = "cobol",
	"fortran" = "fortran",
	"lisp" = "lisp",
	"pascal" = "pascal",
	"sql" = "sql",
	"typescript" = "typescript",
	"elixir" = "elixir",
	"erlang" = "erlang",
	"julia" = "julia",
	"haskell" = "haskell",
	"clojure" = "clojure",
	"ocaml" = "ocaml",
	"fsharp" = "fsharp",
	"webassembly" = "webassembly",
}