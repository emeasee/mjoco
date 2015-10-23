#!/usr/bin/env bash
zip -r worker.zip .
iron worker upload --name mjo_image --zip worker.zip emeasee/mjoimage ruby image_processor.rb -config config-prod.yml
#iron worker queue --payload-file payloads/fieldlogs.json --wait mjo_image
