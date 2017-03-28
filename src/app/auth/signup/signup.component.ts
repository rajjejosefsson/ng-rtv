import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
    selector: 'rj-signup',
    template: `
         <div class="thumbnail col-xs-12">
            <form [formGroup]="myForm" (ngSubmit)="onSignup()">

             <p> 
             <strong>New on rTv?</strong> Register Now!
             </p>
             
             <hr>  
                <div class="form-group">
                    <input formControlName="email" type="email" [ngClass]="{ 'has-error' : !myForm.controls['email'].valid && submitted }" #email id="email" placeholder="Email" class="form-control">
                    <span class="error-message" *ngIf="!myForm.controls['email'].valid && submitted">Invalid mail address</span>
                  
                    <!--<span *ngIf="email.errors['isTaken']">This username has already been taken</span>-->
                </div>

                
                <div class="form-group">
                    <input 
                    formControlName="password" 
                    [ngClass]="{ 'has-error' : !myForm.controls['password'].valid && submitted }" 
                    type="password" 
                    #password 
                    id="password" 
                    placeholder="Password" 
                    class="form-control">
                      <span class="error-message" *ngIf="!myForm.controls['password'].valid && submitted">Password must be at least 6 char long</span>
                </div>
                
                <div class="form-group">
                    <input 
                    formControlName="confirmPassword" 
                    [ngClass]="{ 'has-error' : !myForm.controls['confirmPassword'].valid && submitted }" 
                    type="password" 
                    id="confirm-password" 
                    #confirmPassword  
                    placeholder="Confirm Password" 
                    class="form-control">
                    <span class="error-message" *ngIf="!myForm.controls['confirmPassword'].valid && submitted">Password must match</span>
                </div>
                
                <button type="submit" class="btn yellow-btn btn-primary" >Sign Up</button>
            </form>
           
        </div>
    `,
    styles: [`
  
            
            .thumbnail {
              padding: 15px;     
              width: 300px;
              box-shadow: 0 3px 3px -3px #777;   
            }
            
            .form-group {
                margin-bottom: 10px;
            }  
              
              
            .has-error {
              border: 1px solid red;
             }
             
             .error-message {
                color: red;
             }
              
 
`]
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;
    error = false;
    errorMessage = '';
    submitted = false;

    constructor(private fb: FormBuilder,
        private authService: AuthService) {
    }


    ngOnInit() {
        this.myForm = this.fb.group({
            email: ["", [Validators.required, this.isEmail]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", [Validators.required, this.isEqualPassword.bind(this)]]
        });
    }


    onSignup() {
        this.submitted = true;
        if (this.myForm.valid) {
            if (this.myForm.controls['password'].value == this.myForm.controls['confirmPassword'].value) {
                this.authService.signupUser(this.myForm.value);
            }
        }
    }


    isEmail(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
            return { noEmail: true };
        }
    }

    isEqualPassword(control: FormControl): { [s: string]: boolean } {
        if (!this.myForm) {
            return { passwordsNotMatch: true };

        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    }
}
