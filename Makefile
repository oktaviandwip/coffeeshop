APP=server
BUILD="./build/$(APP)"
DB_DRIVER=postgres
DB_SOURCE="postgres://postgres:postgres@localhost:5432/black_coffeee?sslmode=disable"
MIGRATIONS_DIR=./apps/server/db/migrations
# https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

	migrate -path ./apps/server/db/migrations -database "postgres://postgres:postgres@localhost:5432/black-coffeee?sslmode=disable" -verbose up
install:
	go get -u ./apps/server... && go mod tidy

run:
	CGO_ENABLED=0 GOOS=linux go build -o ${BUILD} ./apps/server/cmd/main.go

testing:
	go test -cover -v ./apps/server/...

migrate-init:
	migrate create -dir ${MIGRATIONS_DIR} -ext sql $(name)

migrate-up:
	migrate -path ${MIGRATIONS_DIR} -database ${DB_SOURCE} -verbose up

migrate-down:
	migrate -path ${MIGRATIONS_DIR} -database ${DB_SOURCE} -verbose down

migrate-fix:
	migrate -path ${MIGRATIONS_DIR} -database ${DB_SOURCE} force 0

compose-up:
	docker compose up -d --force-recreate

compose-down:
	docker compose stop && docker compose down && docker rmi go-server

docker-build-client:
	docker rmi roisfaozi/caffe-client && docker build -t roisfaozi/caffe-client ./apps/client


docker-build-server:
	docker rmi roisfaozi/caffe-server:1 && docker build -t roisfaozi/caffe-server:1 ./apps/server

#user baru :
#createuser  -U postgres -s -P fwg19/username
#
#data base baru :
#createdb -U postgres -O name_user name_database