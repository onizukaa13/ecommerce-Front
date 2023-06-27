import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  firstname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(
    private authService: AuthService,
    private registerService: RegisterService,
    private router: Router
  ) {}

  onRegister() {
    if (this.registerForm.valid) {
      // Effectuer l'enregistrement du compte
      const credentials = {
        name: this.name,
        firstname: this.firstname,
        email: this.email,
        password: this.password
      };

      this.registerService.register(credentials).subscribe({
        next: res => {
          // Rediriger vers la page de connexion
          this.router.navigate(['/login']);
        },
        error: e => {
          // Gérer l'erreur de création de compte
        }
      });
    }
  }
}
