import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  isFirst: boolean = true;
  isLogin: boolean = true;
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  logIn() {
    this.isLogin = false;
    this.authService.login(this.form.getRawValue()).subscribe((res) => {
      localStorage.setItem('token', res.jwtToken);
      this.isLogin = true;
      this.router.navigate(['/admin/home']);
    });
  }
}
