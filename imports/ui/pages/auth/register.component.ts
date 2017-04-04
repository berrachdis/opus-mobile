import { Component, OnInit, NgZone} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController,NavParams } from 'ionic-angular';
//account
import { Accounts } from 'meteor/accounts-base';

//template
import template from './register.html'
import { LoginPage } from './login.component';

//validators
import { FormValidator } from '../../utils/FormValidator';

@Component({
	template
})

export class RegisterPage implements OnInit{

	error: string;
	registerForm: FormGroup;
	imageCrop: string;
	coords: any;
	logInPage: any;
	navigation: NavController;

	constructor(private formBuilder:FormBuilder, private navControl:NavController,private navParam:NavParams, private alertControl: AlertController, private zone: NgZone){
		this.imageCrop = this.navParam.get('data');
		this.coords = this.navParam.get('coords');
		this.logInPage = LoginPage;
		this.navigation = navControl;
	}

	ngOnInit(){
		this.formValidator();
	}

	formValidator(){
		this.registerForm = this.formBuilder.group({
			'email': 	['',Validators.compose([
							 	Validators.maxLength(20),
							 	FormValidator.validEmail
							])
					 	],
			'password': ['',FormValidator.validPassword],
			'password_confirm': ['',FormValidator.validPassword],
		});
		this.error = '';
	}

	register(){
		if(this.registerForm.valid){
			Accounts.createUser({
				email: this.registerForm.value.email,
				password: this.registerForm.value.password
			},(err)=>{
				if(err){
					//erreur
					this.zone.run(() => {
						this.error = err.reason;
						console.log(this.error);
						this.alertMessage('Error',this.error);
					});
				}else{
					console.log(this.error);
					this.navigation.pop();
					Meteor.call("cropPhoto", this.coords, this.imageCrop);
				}
			});
		}else{
			if(this.registerForm.get('email').getError('invalidEmail'))
				this.alertMessage('Error','Invalid email');
			else if(this.registerForm.get('password').getError('invalidPassword'))
				this.alertMessage('Error','Invalid password');
			else
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
