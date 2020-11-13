#!/bin/bash

## Para Tener un ambiente aislado se creo un contenedor docker con el servicio de mysql
## Se crea un voluem temporal
docker volume create temp-mysql-data
## Luego se levanta el contenedor de con credenciales precargadas
docker run --network=host --name mysqltmp -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=test_epayco -e MYSQL_USER=testuser -e MYSQL_PASSWORD=password -d -p 3306:3306 -v temp-mysql-data:/var/lib/mysql mysql