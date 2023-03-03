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
		edit_date := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "niqfsqp1",
			"name": "date",
			"type": "date",
			"required": false,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), edit_date)
		collection.Schema.AddField(edit_date)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		// update
		edit_date := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "niqfsqp1",
			"name": "date",
			"type": "date",
			"required": true,
			"unique": false,
			"options": {
				"min": "",
				"max": ""
			}
		}`), edit_date)
		collection.Schema.AddField(edit_date)

		return dao.SaveCollection(collection)
	})
}