# import-images cli

## Description
###  import-images cli is a one command cli, we can send to cli two parameters , URL with images addresses, and the target folder, the cli fetch all images addresses from given URL, and create a HTML file with a gallery of all images that given from URL.

## Usage
### import-images -u [Images URL] -f [folder name]
### Execute the cli with require parameters

### import-images -h 
### Get help how to use

## CLI packages
### yargs - Gives us commants line interface
### axios - make the REST call to get the images

## resources
### unsplash: 
#### REST call: https://api.unsplash.com/photos/
#### Client ID: _Ptp-xvvVQ9Ja0M0qkRPRd4Eod7yYdRe7CJEbYMFDmY
#### Call example: https://api.unsplash.com/photos/?client_id=_Ptp-xvvVQ9Ja0M0qkRPRd4Eod7yYdRe7CJEbYMFDmY