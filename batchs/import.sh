#!/bin/sh
set -e

node ./batchs/import-entities.js
node ./batchs/import-campaigns.js
node ./batchs/import-campaigns-items.js
node ./batchs/import-campaigns-items-choices.js
