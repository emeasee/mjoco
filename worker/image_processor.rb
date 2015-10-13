require_relative 'bundle/bundler/setup'
require 'open-uri'
require 'rest-client'
require 'aws'
require 'subexec'
require 'mini_magick'
require 'iron_mq'
require 'iron_worker'

def resize_image(filename, width=nil, height=nil, quality=nil, format='jpg')
  image = MiniMagick::Image.open(filename)
  name = File.basename(filename,File.extname(filename))
  original_width, original_height = image[:width], image[:height]
  width ||= original_width
  height ||= original_height
  output_filename = "#{name}-w#{width}-q#{quality}.#{format}"
  image.resize "#{width}x#{height}"
  image.quality(quality)
  image.format format
  image.write output_filename
  output_filename
end

def generate_thumb(filename, width=nil, height=nil, format='jpg')
  name = File.basename(filename,File.extname(filename))
  output_filename = "#{name}-w#{width}-h#{height}.#{format}"
  image = MiniMagick::Image.open(filename)
  image.combine_options do |c|
    c.resize "#{width}x#{width}"
    c.thumbnail "#{width}x#{height}"
    c.background 'white'
    c.extent "#{width}x#{height}"
    c.gravity "center"
  end
  image.format format
  image.write output_filename
  output_filename
end

def upload_file(filename)
  unless IronWorker.payload["disable_network"]
    filepath = filename
    puts "\nUploading the file to s3..."
    s3 = Aws::S3Interface.new(IronWorker.config['access_key'], IronWorker.config['secret_key'])
    s3.create_bucket(IronWorker.config['s3_bucket_name'])
    response = s3.put(IronWorker.config['s3_bucket_name'], filename, File.open(filepath))
    if response == true
      puts "Uploading succesful."
      link = s3.get_link(IronWorker.config['s3_bucket_name'], filename)
      puts "\nYou can view the file here on s3:", link
    else
      puts "Error placing the file in s3."
    end
    puts "-"*60
  end
end

def download_image(x)
  filename = x
  unless IronWorker.payload["disable_network"]
    filepath = filename
    File.open(filepath, 'wb') do |fout|
      open("#{IronWorker.config['bucket_url']}#{x}") do |fin|
        IO.copy_stream(fin, fout)
      end
    end
  end
  filename
end

def process_image(image)
    puts "Downloading image #{image}"

    filename = download_image("#{image}")

    puts "Generating related project thumbnails"
    processed_filename = generate_thumb(filename, 380, 254)
    upload_file(processed_filename)

    puts "Generating mobile picture"
    processed_filename = resize_image(filename, 700, nil, 50)
    upload_file(processed_filename)

    puts "Generating mid picture"
    processed_filename = resize_image(filename, 1200, nil, 90)
    upload_file(processed_filename)

    puts "Generating mid picture quality boost"
    processed_filename = resize_image(filename, 1200, nil, 95)
    upload_file(processed_filename)

    puts "Generating large picture"
    processed_filename = resize_image(filename, 1400, nil, 90)
    upload_file(processed_filename)

    puts "Generating large picture quality boost"
    processed_filename = resize_image(filename, 1400, nil, 95)
    upload_file(processed_filename)

    puts "Generating xlarge picture"
    processed_filename = resize_image(filename, 1600, nil, 90)
    upload_file(processed_filename)

    puts "Generating xlarge picture quality boost"
    processed_filename = resize_image(filename, 1600, nil, 95)
    upload_file(processed_filename)
end

# temp URL for development
url = 'https://mjoco.herokuapp.com'

# get the projects payload array
projects = IronWorker.payload["projects"]

token = RestClient.post(
  "#{url}/auth/local",
  {"email" => "#{IronWorker.config['mjoco_user']}", "password" =>"#{IronWorker.config['mjoco_pass']}"},
  :content_type => 'application/json')

hash = JSON[token]

# for each project lets run through image generation and uploading to s3 then formatting and sending a POST to the database
projects.each{ |project|
    # todo:
    # - iterate through assets in project_assets & section_assets and:
      # - if asset.flag = true then process image & upload to s3
    # - GET project from api by current project id and if:
        # - exists then PATCH with updated body to api
        # - does not exist, POST to the api


  puts "Processing project assets"
  # download and process imagery that has been flagged
  project['project_sections'].each do |section|
    next if section['section_type'] === "video"
    section['section_assets'].each do |asset|
      next if asset['asset_flag'] == false
      process_image("#{asset['asset_id']}.#{asset['asset_format']}")
    end
  end

  req = RestClient.get "#{url}/api/projects/#{project['project_url']}"

  if req.include? 'project_id'
    puts "#{project['project_url']} already exists: moving to update"
  else
    begin
      RestClient.post "#{url}/api/projects", project.to_json, {:Authorization => "Bearer #{hash['token']}", :content_type => :json, :accept => :json}
    rescue => e
      puts e.response
    end
  end

}
