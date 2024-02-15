# tic-tac-toe
A Tic-Tac-Toe App using Javascript CSS HTML

## Getting Started

To get started with developement simply run the following commands

```BASH
yarn
yarn start
```

## Running Unit Tests

```BASH
yarn
yarn run test tests/unit
```

## Running E2E Tests

```BASH
yarn 
yarn playwright install --with-deps
yarn run test-e2e
```

## Running via Docker

```BASH
docker build -t tic-tac-toe-game .
docker run -p 3000:3000 -p 9323:9323 -p 8080:8080 tic-tac-toe-game
# get the cotainer ID
docker ps | grep tic-tac-toe
# use the cotainer ID to open up a Shell in the container
# EXAMPLE, replace "b9884a257bc0" with your own container ID
docker exec -it b9884a257bc0 /bin/bash
# once the shell is open you should see
# root@b9884a257bc0:/usr/src/app#
cd /usr/src/app;
yarn run test tests/unit;
yarn run test-e2e;
```

## Contributors
Daniel Van Rensburg 

