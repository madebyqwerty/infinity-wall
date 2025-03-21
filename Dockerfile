FROM node:18

RUN apt-get update && apt-get install -y \
    build-essential \
    golang \
    ca-certificates \
    unzip \
    openssh-client \
    curl

# Install Caddy 2.6.2
RUN curl -L -o caddy.tar.gz "https://github.com/caddyserver/caddy/releases/download/v2.6.2/caddy_2.6.2_linux_amd64.tar.gz" && \
    tar -xzf caddy.tar.gz caddy && \
    mv caddy /usr/local/bin/caddy && \
    chmod +x /usr/local/bin/caddy && \
    rm caddy.tar.gz

ENV CGO_CFLAGS="-D_LARGEFILE64_SOURCE"

# Copy your custom PocketBase and build
COPY ./ /app
WORKDIR /app/backend

# Note: This will pull the latest version of pocketbase. If you are just doing 
# simple customizations and don't have a local build environment for Go, 
# leave this line in. 
# For more complex builds that include other dependencies, remove this 
# line and rely on the go.sum lockfile.
RUN go get github.com/pocketbase/pocketbase@v0.10.1

RUN go build
WORKDIR /app/web

RUN npm ci

RUN npm run build

WORKDIR /app

EXPOSE 80

