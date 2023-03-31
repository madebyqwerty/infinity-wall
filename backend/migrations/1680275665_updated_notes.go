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

		collection, err := dao.FindCollectionByNameOrId("noism7kh2y7yrky")
		if err != nil {
			return err
		}

		// update
		edit_body := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "e0o1mjlw",
			"name": "body",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_body)
		collection.Schema.AddField(edit_body)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("noism7kh2y7yrky")
		if err != nil {
			return err
		}

		// update
		edit_body := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "e0o1mjlw",
			"name": "body",
			"type": "text",
			"required": true,
			"unique": false,
			"options": {
				"min": null,
				"max": 120,
				"pattern": ""
			}
		}`), edit_body)
		collection.Schema.AddField(edit_body)

		return dao.SaveCollection(collection)
	})
}
