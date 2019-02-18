import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';
  constructor(private fb: FormBuilder, private auth: AuthService, private Router : Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.initForm();



    this.route.params.subscribe((params) => {
      if ( params['registered'] == "success" ) {
        return this.notifyMessage = 'You have been registered successfully, You can login now!';
      }
    }

    )
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
            (this.loginForm.controls[fieldName].dirty ||
             this.loginForm.controls[fieldName].touched);
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        this.Router.navigate(['/rentals']);
        console.log('Login Success!' + token);
      },
      (errorResponse) => {
        console.log(errorResponse);
        this.errors = errorResponse.error.errors;
      }
    );

  }
}
