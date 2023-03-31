# Upshop Track - Tým QWERTY

1. Tomáš Kebrle
2. Daniel Ransdorf
3. Václav Parma

## Funkce

- Funguje Markdown editor 
- Nástěnka je nekonečná
- Za note se dá potáhnout při okraji
- Kolečkem se zoomuje
- Zmačknutím myši se posunuje

## Jak spustit

`cd web`
`npm run dev`

V novém terminálu

`cd backend`
`go run main.go serve`

Nebo zkompilovat

`go build main.go`
`./backend serve`

Nebo docker
`docker build . -t upshop .`
`docker run -p 80:80 upshop`
