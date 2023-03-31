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
		edit_x := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "3mof8w7o",
			"name": "x",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_x)
		collection.Schema.AddField(edit_x)

		// update
		edit_y := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "2kipq56u",
			"name": "y",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_y)
		collection.Schema.AddField(edit_y)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("noism7kh2y7yrky")
		if err != nil {
			return err
		}

		// update
		edit_x := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "3mof8w7o",
			"name": "positionX",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_x)
		collection.Schema.AddField(edit_x)

		// update
		edit_y := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "2kipq56u",
			"name": "positionY",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_y)
		collection.Schema.AddField(edit_y)

		return dao.SaveCollection(collection)
	})
}
