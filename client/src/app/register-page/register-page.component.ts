import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from './../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  authSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.authSubscription = this.auth.register(this.form.value).subscribe(
      (r) => {
        // console.log('12', r);
        this.router.navigate(['/login'], {
          queryParams: {
            registred: true
          }
        });
      },
      error => {
        this.form.enable();
        MaterialService.toast(error.error.message);
      }
    );
  }

}
