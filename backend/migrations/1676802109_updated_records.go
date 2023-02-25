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
		edit_time := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "u2rgsorx",
			"name": "time",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 1,
				"max": 1440
			}
		}`), edit_time)
		collection.Schema.AddField(edit_time)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// update
		edit_time := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "u2rgsorx",
			"name": "time",
			"type": "number",
			"required": true,
			"unique": false,
			"options": {
				"min": 0,
				"max": 1440
			}
		}`), edit_time)
		collection.Schema.AddField(edit_time)

		return dao.SaveCollection(collection)
	})
}
