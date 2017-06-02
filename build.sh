#!/bin/bash

cp README.md ./apiwhatever/README.md

cd ./apiwhatever/
vi package.json

npm publish
