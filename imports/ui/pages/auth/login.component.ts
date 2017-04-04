import { Component, OnInit, NgZone} from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

import { MeteorObservable } from 'meteor-rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//database

//interfaces

import { FormValidator } from '../../utils/FormValidator';

//template
import { RegisterPage } from './register.component';
import template from './login.html';
import { MosaiquePage } from '../mosaique/mosaique.component';

@Component({
	template
})

export class LoginPage implements OnInit{

	loginInForm: FormGroup;
	error: string;
	navigation: NavController;
	registerPage: any;

	constructor(private formBuilder:FormBuilder, private navControl:NavController, private zone: NgZone,private alertControl: AlertController,private navParam: NavParams){
		this.navigation = navControl;
		this.registerPage = RegisterPage;
	}

	ngOnInit(){
		this.formValidator();
	}

	formValidator(){
		this.loginInForm = this.formBuilder.group({
			'email': ['',Validators.required,
						 Validators.maxLength(20),
						 FormValidator.validEmail
						],

			'password': ['',FormValidator.validPassword]
		});
		this.error = '';
	}

	logIn(){
		if(this.loginInForm.valid){
			Meteor.loginWithPassword(this.loginInForm.value.username,this.loginInForm.value.password,(err) => {
		        if (err) {
		          this.zone.run(() => {
		            this.error = <string>err.reason;
		            console.log(this.error);
		            this.alertMessage('Error',this.error);
		          });
		        }else {
		          this.navigation.setRoot(MosaiquePage); 
		        }
			});
		}else{
			this.alertMessage('Error','All fields are required');	
		}
	}

	alertMessage(title: string, subTitle: string):void {
			let alert = this.alertControl.create({
				title: title,
				subTitle: subTitle,
				buttons: ['Try Again']
			});
		alert.present();
	}
}