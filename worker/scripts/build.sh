#!/usr/bin/env bash
eval "$(docker-machine env default --shell ssh)"
docker run --rm -v $PWD:/worker -w /worker iron/ruby:dev bundle install --standalone --clean
docker build -t emeasee/mjoimage:latest .
docker push emeasee/mjoimage
