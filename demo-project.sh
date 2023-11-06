#!/bin/bash

TARGET_DIR="/Users/i.agbasimalo/projects/code/knexup-projects"
PROJECT_NAME=testproject

npm run build;
node dist/bin/index.js project "${PROJECT_NAME}" --path="${TARGET_DIR}" -d mysql;