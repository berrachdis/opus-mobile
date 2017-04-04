import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as Moment from 'moment';

//ionic
import { NavParams, NavController } from 'ionic-angular';

//meteor
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs';
import { MeteorObservable } from "meteor-rxjs";

//package ext
import { OpenSeadragon } from 'meteor/abarrahjaouad:openseadragon-wrapper';
import * as $ from 'jquery'; 

//component

import { RegisterPage } from '../auth/register.component';

//template of component
import template from "./mosaique.html";
@Component({
	template
})
export class MosaiquePage implements OnInit{

	viewer: any;
	navigation:NavController;

	constructor(private navControl:NavController){
	
		this.navigation = navControl;
	
	}

	ngOnInit(){

        this.showMosaique();
	
	}  

	showMosaique(){
		this.viewer = OpenSeadragon({
	        id: "openseadragon1",
	        crossOriginPolicy : "Anonymous",
	        navigationControlAnchor : OpenSeadragon.ControlAnchor.BOTTOM_RIGHT,
	        prefixUrl: "mosaic/images/",
	        fullScreen:true,
	        // tileSources: "http://localhost/opusmagnum/mosaic_results/METEORTEST/A14056.dzi",
	        tileSources: {
	          type: 'image',
	          url:  'first.jpg'
	        }, 
	        navImages:{ // overwrites OpenSeadragon's options
	            zoomIn: {
	                REST:   'zoomin_rest.png',
	                GROUP:  'zoomin_rest.png',
	                HOVER:  'zoomin_rest.png',
	                DOWN:   'zoomin_rest.png'
	            },
	            zoomOut: {
	                REST:   'zoomout_rest.png',
	                GROUP:  'zoomout_rest.png',
	                HOVER:  'zoomout_rest.png',
	                DOWN:   'zoomout_rest.png'
	            },
	            home: {
	                REST:   'home_rest.png',
	                GROUP:  'home_rest.png',
	                HOVER:  'home_rest.png',
	                DOWN:   'home_rest.png'
	            },
	            fullpage: {
	                REST:   'fullpage_rest.png',
	                GROUP:  'fullpage_rest.png',
	                HOVER:  'fullpage_rest.png',
	                DOWN:   'fullpage_rest.png'
	            },
         	}
   		});
	    var selection = this.viewer.selection({
	        showSelectionControl:    true, // show button to toggle selection mode
	        backgroundImage:         'crop.png',
	        toggleButton:            null, // dom element to use as toggle button
	        showConfirmDenyButtons:  true,
	        styleConfirmDenyButtons: true,
	        returnPixelCoordinates:  true,
	        keyboardShortcut:        'c', // key to toggle selection mode  
	        rect:                    null, // initial selection as an OpenSeadragon.SelectionRect object
	        restrictToImage:         true, // true = do not allow any part of the selection to be outside the image
	        onSelection:             function(coords) {
	            var canvas = $(".openseadragon-canvas > canvas")[0];
	            var canvas_copy = document.createElement('canvas');
	            canvas_copy.width =250;
	            canvas_copy.height=200;
	            var ctx_copy = canvas_copy.getContext('2d');
	            var w = window.devicePixelRatio;
	            ctx_copy.drawImage(canvas,coords.wrect.x*w, coords.wrect.y*w,coords.wrect.width*w,coords.wrect.height*w,0,0,250,250);
	            this.navigation.push(RegisterPage,{data:canvas_copy.toDataURL(),coords:coords});
	            //Meteor.call("cropPhoto", coords.rect, canvas_copy.toDataURL());
	            // console.log("coords :",coords);
	            selection.disable();
	        }.bind(this),

	        navImages:{
	            selection: {
	                REST:   'crop_rest.png',
	                GROUP:  'crop_rest.png',
	                HOVER:  'crop_rest.png',
	                DOWN:   'crop_rest.png'
	            },
	            selectionConfirm: {
	                REST:   'selection_confirm_rest.png',
	                GROUP:  'selection_confirm_rest.png',
	                HOVER:  'selection_confirm_rest.png',
	                DOWN:   'selection_confirm_rest.png'
	            },
	            selectionCancel: {
	                REST:   'selection_cancel_rest.png',
	                GROUP:  'selection_cancel_rest.png',
	                HOVER:  'selection_cancel_rest.png',
	                DOWN:   'selection_cancel_rest.png'
	            },
	        }
	    });
		this.viewer.addHandler('selection_toggle', function (e) {
	        if(!e.enabled){
	          this.viewer.setMouseNavEnabled(true);
	          this.viewer.setControlsEnabled(true)
	          console.log('select',e);
	        }else{
	          this.viewer.setMouseNavEnabled(false);
	          this.viewer.setControlsEnabled(false)
	          console.log('select',e);
	        }
      	}.bind(this));
	}
}