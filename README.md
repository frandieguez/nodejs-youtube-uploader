# NodeJS Youtube uploader

The NodeJS Youtube Uploader (nodejs-youtube-uploader) is a tool that helps you
to upload local video files from to Youtube.

## Requirements

- node (nodejs in some distros)
- npm

## Installation

1. Clone this repository.

        git clone git@github.com:frandiegeuz/nodejs-youtube-uploader.git

2. Install dependencies included in package.json.

        npm install

4. Check if the tool executes successfully.

        ./bin/youtube-uploader --help

The `nodejs-youtube-uploader` script tries to discover the command for the node
executable. If you already know the executable for node you can use the tool
directly with the following command:

    node src/main.js --help

## Commands

The `nodejs-youtube-uploader` tool supports the following commands.

### Authenticate

The `authenticate` command fetches or updates the credentials from Youtube API using
a local credentials.json file that was previously downloaded from GCC (https://console.cloud.google.com/home/dashboard)
To know more about the options for the `authenticate` command execute

    ./bin/nodejs-youtube-uploader auhtenticate --help

### Upload

The `upload` command parses an input CSV file, uploads files to Youtube and writes
a CSV file in an output file.
To know more about the options for the `upload` command execute

    ./bin/nodejs-youtube-uploader upload --help

#### Upload parameters

The `upload` takes the Youtube AP

To support advanced extractions from files the `upload` command defines the
following list of parameters.

##### input

The `input` parameter changes the path where JSON files to parse are stored. If
it is not provided, the input directory will be `csv`.

##### output

The `output` parameter defines the path to the resulting CSV file.
