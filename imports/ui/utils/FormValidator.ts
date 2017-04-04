import {FormControl, FormGroup} from "@angular/forms";
import { IValidationResult } from "./ValidationResultInterface";

export class FormValidator {

    static notEmpty(control:FormControl):IValidationResult {
        var regex = /\S+/;
        if (!regex.test(control.value)) {
            return {empty: true};
        }
    }
    static validUsername(control:FormControl):IValidationResult {
        var USER_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-].{5,20}/;
        if(!USER_REGEXP.test(control.value)){
            return {invalidUsername: true};
        }
    }
    static validEmail(control:FormControl):IValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
        if (!EMAIL_REGEXP.test(control.value)) {
            return {invalidEmail: true};
        }
    }
    static validPassword(control:FormControl):IValidationResult {
        var PASSWORD_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-].{5,15}/;  
        if(!PASSWORD_REGEXP.test(control.value))
            return{invalidPassword: true} 
    }
    static validPasswordConfirm(control:FormControl,password:string):IValidationResult{
        var PASSWORD_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-].{5,15}/;
        if((control.value !== password) && (PASSWORD_REGEXP.test(control.value)))
            return {invalidPasswordConfirm: true};
    }
    static matchingFields(validatorName:string, key1:string, key2:string) {
        return (group:FormGroup):{[key: string]: any} => {
            let key1value = group.controls[key1];
            let key2value = group.controls[key2];

            if (key1value.value !== key2value.value) {
                return {
                    mismatchedFields: validatorName
                };
            }
        }
    }
}