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

		// update
		edit_language := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "vspw17ih",
			"name": "language",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 30,
				"pattern": ""
			}
		}`), edit_language)
		collection.Schema.AddField(edit_language)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// update
		edit_language := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "vspw17ih",
			"name": "language",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": 1,
				"max": 50,
				"pattern": ""
			}
		}`), edit_language)
		collection.Schema.AddField(edit_language)

		return dao.SaveCollection(collection)
	})
}
