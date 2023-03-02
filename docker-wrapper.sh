#!/bin/bash

# ~stolen~ borrowed from here https://docs.docker.com/config/containers/multi-service_container/

PORT=8080 PROTOCOL_HEADER=x-forwarded-proto HOST_HEADER=x-forwarded-host node web/build & ./backend/backend serve --http 127.0.0.1:8090 \
& caddy run \
& curl --request POST \
--url 127.0.0.1:8090/api/admins \
--header 'content-type: application/json' \
--data '{"email":"admin@upshop.cz","password":"1234567890", "passwordConfirm":"1234567890"}' \
# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?