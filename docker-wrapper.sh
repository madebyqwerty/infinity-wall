#!/bin/bash

# ~stolen~ borrowed from here https://docs.docker.com/config/containers/multi-service_container/

node web/build & ./backend/backend serve --http 0.0.0.0:8090 & caddy run

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?