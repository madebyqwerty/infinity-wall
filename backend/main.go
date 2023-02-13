package main

import (
	"log"
	_ "upshop/backend/migrations"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, &migratecmd.Options{
		Automigrate: true, // auto creates migration files when making collection changes
	})

	// Must be at the end to first initialize all the custom routes
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}

}
