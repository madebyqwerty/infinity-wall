package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "upflwfxklqjih7x",
			"created": "2023-02-16 17:02:05.770Z",
			"updated": "2023-02-16 17:02:05.770Z",
			"name": "records",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "kxitmqrt",
					"name": "date",
					"type": "date",
					"required": true,
					"unique": false,
					"options": {
						"min": "",
						"max": ""
					}
				},
				{
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
				},
				{
					"system": false,
					"id": "lc1nfbaz",
					"name": "language",
					"type": "json",
					"required": false,
					"unique": false,
					"options": {}
				},
				{
					"system": false,
					"id": "afi9xmtr",
					"name": "rating",
					"type": "number",
					"required": true,
					"unique": false,
					"options": {
						"min": 1,
						"max": 5
					}
				},
				{
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
				}
			],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
