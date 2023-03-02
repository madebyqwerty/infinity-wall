package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		// add up queries...

		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("admins")

		if err != nil {
			return err
		}

		record := models.NewRecord(collection)

		record.SetEmail("admin@upshop.cz")
		record.SetPassword("123456")
		record.SetUsername("admin")

		if err := dao.SaveRecord(record); err != nil {
			return err
		}

		return nil
	}, func(db dbx.Builder) error {
		// add down queries...

		return nil
	})
}
