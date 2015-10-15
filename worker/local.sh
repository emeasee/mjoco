#!/usr/bin/env bash
docker run --rm -it -e "PAYLOAD_FILE=payloads/fieldlogs.json" -v "$PWD":/worker -w /worker iron/images:ruby-2.1 sh -c 'ruby image_processor.rb -config config-local.yml'
