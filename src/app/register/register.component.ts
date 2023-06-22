import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterService } from '../services/register.service';

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

  constructor(private authService: AuthService,private registerService: RegisterService, private router: Router) {}

  onRegister() {
    
    if (this.password !== this.confirmPassword) {
      // Gérer l'erreur de confirmation du mot de passe
      
      return;
    }

    const credentials = {
      name: this.name,
      firstname: this.firstname,
      email: this.email,
      password: this.password
    };    
    this.registerService.register(credentials).subscribe({
      next: res => {
        this.router.navigateByUrl('/login')
      },
      error: e => {
        // Gérer l'erreur de création de compte
      }
    });
  }
}


