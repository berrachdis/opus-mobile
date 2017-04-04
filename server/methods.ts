import { Meteor } from 'meteor/meteor';
// import saveAs from 'save-as';
//import { Canvas } from 'canvas';
 // import * as 'fs' from "fs";
// import fs = require('fs');
import * as sharp from 'sharp';
Meteor.methods({
	cropPhoto(coords,imageData) {
	    check(coords, Object);
	    check(imageData, String);
	    // console.log('entrer');
	    // let image = new Image();
	    // image.src = imageData;

	    const img = sharp("/private/images/first.jpg")
	        .extract({ left: coords.x, top: coords.y, width: coords.width, height: coords.height })
	        .resize(1000,906)
	        .overlayWith(process.env.PWD+'/private/images/apple.png')
	        .toBuffer((err, buffer, info) => {
	            return sharp(buffer)
	                .overlayWith(process.env.PWD+'/private/images/base.png',{ cutout: true })
	                .toFile(process.env.PWD+'/public/crop1.png', (err, info) => { 
	                });
	        })
	        console.log(coords.x);
	    return "some return value";
  	},
});