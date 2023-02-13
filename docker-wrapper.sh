#!/bin/bash

# ~stolen~ borrowed from here https://docs.docker.com/config/containers/multi-service_container/

PORT=80 node web/build &
./backend/backend serve --http 0.0.0.0:8090

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?