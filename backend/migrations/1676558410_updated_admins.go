package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("jp6n8w2klu9kw0i")
		if err != nil {
			return err
		}

		options := map[string]any{}
		json.Unmarshal([]byte(`{
			"allowEmailAuth": true,
			"allowOAuth2Auth": true,
			"allowUsernameAuth": true,
			"exceptEmailDomains": null,
			"manageRule": null,
			"minPasswordLength": 6,
			"onlyEmailDomains": null,
			"requireEmail": false
		}`), &options)
		collection.SetOptions(options)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("jp6n8w2klu9kw0i")
		if err != nil {
			return err
		}

		options := map[string]any{}
		json.Unmarshal([]byte(`{
			"allowEmailAuth": true,
			"allowOAuth2Auth": true,
			"allowUsernameAuth": true,
			"exceptEmailDomains": null,
			"manageRule": null,
			"minPasswordLength": 8,
			"onlyEmailDomains": null,
			"requireEmail": false
		}`), &options)
		collection.SetOptions(options)

		return dao.SaveCollection(collection)
	})
}
