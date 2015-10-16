#!/usr/bin/env bash
eval "$(docker-machine env default --shell ssh)"
docker build -t emeasee/mjoimage:latest .
docker push emeasee/mjoimage
