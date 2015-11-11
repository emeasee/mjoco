#! /bin/bash
eval "$(docker-machine env default --shell ssh)"
#The commands below run docker-machine and runs a test container of the worker
docker run --rm -it -e "PAYLOAD_FILE=payloads/projects/fieldlogs.json" -v "$PWD":/worker -w /worker emeasee/mjoimage ruby image_processor.rb -config config-local.yml
