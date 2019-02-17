import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];
  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() { }

  register(registerForm): any {

    this.Auth.register(registerForm.form.value).subscribe(
      () => {
        this.router.navigate(['/login', { registered : 'success'}]);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      });

  }
}
