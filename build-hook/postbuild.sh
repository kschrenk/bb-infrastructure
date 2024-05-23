#!/bin/bash

TARGET_DIR="dist/"

# copy the files into the dist directory
cp package.json $TARGET_DIR
cp package-lock.json $TARGET_DIR
cp ecosystem.config.js $TARGET_DIR

# copy the config directory and its files into the dist directory
cp -r config $TARGET_DIR
