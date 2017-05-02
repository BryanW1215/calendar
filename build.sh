#!/usr/bin/env bash
cd ./frontend
case $1 in
    "production")
        ng build --prod --environment=prod --target=production --output-hashing=none
    ;;
    "development")
        ng build --environment=dev --target=development --output-hashing=none
    ;;
    "serve")
        ng serve
esac
cd ..