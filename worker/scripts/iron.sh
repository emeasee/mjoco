#!/usr/bin/env bash
eval "$(docker-machine env default --shell ssh)"
docker run --rm -v $PWD:/worker -w /worker iron/ruby:dev bundle install --standalone --clean
zip -r worker.zip .
iron worker upload --name mjo_image --zip worker.zip emeasee/mjoimage ruby image_processor.rb -config config-prod.yml
iron worker queue --payload-file payloads/fieldlogs.json --wait mjo_image

DOCKER_CERT_PATH=/Users/Mac/.docker/machine/machines/default
DOCKER_TLS_VERIFY=1
DOCKER_HOST=tcp://192.168.99.100:2376
