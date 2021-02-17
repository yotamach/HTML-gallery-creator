#!/usr/bin/env node
var fs = require('fs');
const axios = require('axios');
// Create the command line interface
const argv = require('yargs')
    .usage('Usage: import-images <command> [options]')
    .example('import-images -u [Images URL] -f [folder name]', 'Import all images in URL to HTML file in target folder')
    .alias('u', 'URL')
    .alias('f', 'folderName')
    .nargs('u', 1)
    .nargs('f', 1)
    .describe('u', 'Load a URL')
    .describe('f', 'Target folder')
    .demandOption(['u','f'])
    .help('h')
    .alias('h', 'help').argv;

// Make the REST call to given URL
axios.get(argv.URL)
    .then(function (response) {
        const imagesArray = response.data;
        // Check if the given URL has an images
        if(imagesArray.lenght === 0 || !imagesArray[0].urls)
            throw new Error("Impossable to fetch images from this URL");
        // fetch the images to array of strings
        const imagesToFile = imagesArray.map(element => element.urls.thumb);
        try{
            // check if folder by given name is exist, if not we create it
            const dir = './'+argv.folderName;
            let fileName = argv.folderName+'/index.html';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            // open 'index.html' file in target folder, if it exist we override it
            let stream = fs.createWriteStream(fileName);
    
            stream.once('open', function (fd) {
                let html = buildHtml(imagesToFile);
    
                stream.end(html);
            });
            console.log("The HTML file is created successfuly! the update HTML file (index.html) is located in 'target' folder");
        }
        catch(e){
            throw new Error("Can't create the file!");
        }
    })
    .catch(function (error) {
        console.log(error.message);
    })
    .then(function () {
        console.log("Script ends!");
    });

    // this function create the content of the file , we send the images array as a parameter, and we make a title and grid of images(I use flex box)
    function buildHtml(images) {
        let header = '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Imges Gallery</title>';
        let body = '<div style="width: 100%; color: white; background-color: blue; padding: 15px 15px;"><h3>Images gallery</h3></div>';
        
        let galleryContent = images.map((image,index) => `<figure style="vertical-align: baseline; max-width: 120px"><img src="${image}" style="width: 100%;height: 100%;object-fit: cover;" alt="Image ${index}"></figure>`)
        body+= `<div style="display: flex; flex-wrap: wrap;">${galleryContent.join("")}</div>`;
      
        return '<!DOCTYPE html><html lang="en">'
             + '<html><head>' + header + '</head><body>' + body + '</body></html>';
      };