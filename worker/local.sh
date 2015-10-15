#!/usr/bin/env bash
docker run --rm -it -e "PAYLOAD_FILE=payloads/fieldlogs.json" -v "$PWD":/worker -w /worker emeasee/mjoimage sh -c 'ruby image_processor.rb -config config-local.yml'
