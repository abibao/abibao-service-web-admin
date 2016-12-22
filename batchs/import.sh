#!/bin/sh
set -e

CACHE_PATH=/home/gperreymond/Workspaces/gperreymond/api-gateway/src/tools/.cache/prod/rethinkdb

node ./batchs/import-entities.js $CACHE_PATH
node ./batchs/import-campaigns.js $CACHE_PATH
node ./batchs/import-campaigns-items.js $CACHE_PATH
node ./batchs/import-campaigns-items-choices.js $CACHE_PATH
