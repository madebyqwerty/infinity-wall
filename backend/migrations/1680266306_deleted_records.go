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
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("upflwfxklqjih7x")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	}, func(db dbx.Builder) error {
		jsonData := `{
			"id": "upflwfxklqjih7x",
			"created": "2023-02-16 17:02:05.770Z",
			"updated": "2023-03-31 12:37:22.195Z",
			"name": "records",
			"type": "base",
			"system": false,
			"schema": [
				{
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
				},
				{
					"system": false,
					"id": "afi9xmtr",
					"name": "rating",
					"type": "number",
					"required": false,
					"unique": false,
					"options": {
						"min": 0,
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
						"max": 500,
						"pattern": ""
					}
				},
				{
					"system": false,
					"id": "pt20o7wq",
					"name": "user",
					"type": "relation",
					"required": true,
					"unique": false,
					"options": {
						"collectionId": "_pb_users_auth_",
						"cascadeDelete": true,
						"maxSelect": 1,
						"displayFields": []
					}
				},
				{
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
				},
				{
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
				}
			],
			"listRule": "@request.auth.id = user.id",
			"viewRule": "@request.auth.id = user.id",
			"createRule": "@request.auth.id = user.id",
			"updateRule": "@request.auth.id = user.id",
			"deleteRule": "@request.auth.id = user.id",
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	})
}
