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
			"id": "noism7kh2y7yrky",
			"created": "2023-03-31 12:41:00.060Z",
			"updated": "2023-03-31 12:41:00.060Z",
			"name": "notes",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "nydby0bo",
					"name": "author",
					"type": "text",
					"required": true,
					"unique": false,
					"options": {
						"min": 0,
						"max": 50,
						"pattern": ""
					}
				},
				{
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
				},
				{
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
				},
				{
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
				},
				{
					"system": false,
					"id": "jb4xyb9j",
					"name": "theme",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
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

		collection, err := dao.FindCollectionByNameOrId("noism7kh2y7yrky")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
