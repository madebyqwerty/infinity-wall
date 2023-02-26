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

		// remove
		collection.Schema.RemoveField("lc1nfbaz")

		// add
		new_language := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "fed1mijf",
			"name": "language",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 0,
				"max": 20,
				"pattern": "/^(\"java\"|\"cpp\"|\"python\"|\"javascript\"|\"csharp\"|\"php\"|\"ruby\"|\"perl\"|\"swift\"|\"golang\"|\"kotlin\"|\"scala\"|\"rlang\"|\"bash\"|\"rust\"|\"objectivec\"|\"react\"|\"angular\"|\"vue\"|\"ember\"|\"svelte\"|\"clang\"|\"cobol\"|\"fortran\"|\"lisp\"|\"pascal\"|\"sql\"|\"typescript\"|\"elixir\"|\"erlang\"|\"julia\"|\"haskell\"|\"clojure\"|\"ocaml\"|\"fsharp\"|\"webassembly\")$/"
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

		// add
		del_language := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "lc1nfbaz",
			"name": "language",
			"type": "json",
			"required": false,
			"unique": false,
			"options": {}
		}`), del_language)
		collection.Schema.AddField(del_language)

		// remove
		collection.Schema.RemoveField("fed1mijf")

		return dao.SaveCollection(collection)
	})
}
