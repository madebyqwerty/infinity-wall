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
		edit_description := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "aob7ebrn",
			"name": "description",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 500,
				"pattern": ""
			}
		}`), edit_description)
		collection.Schema.AddField(edit_description)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// update
		edit_description := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "aob7ebrn",
			"name": "description",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": 498,
				"pattern": ""
			}
		}`), edit_description)
		collection.Schema.AddField(edit_description)

		return dao.SaveCollection(collection)
	})
}
