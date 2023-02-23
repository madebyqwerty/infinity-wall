package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// add
		new_language := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "odz4up7a",
			"name": "language",
			"type": "select",
			"required": true,
			"unique": false,
			"options": {
				"maxSelect": 36,
				"values": [
					"java",
					"cpp",
					"python",
					"javascript",
					"csharp",
					"php",
					"ruby",
					"perl",
					"swift",
					"golang",
					"kotlin",
					"scala",
					"rlang",
					"bash",
					"rust",
					"objectivec",
					"react",
					"angular",
					"vue",
					"ember",
					"svelte",
					"clang",
					"cobol",
					"fortran",
					"lisp",
					"pascal",
					"sql",
					"typescript",
					"elixir",
					"erlang",
					"julia",
					"haskell",
					"clojure",
					"ocaml",
					"fsharp",
					"webassembly"
				]
			}
		}`), new_language)
		collection.Schema.AddField(new_language)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("odz4up7a")

		return dao.SaveCollection(collection)
	})
}
