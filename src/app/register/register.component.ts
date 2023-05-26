import { Component } from '@angular/core';
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

  constructor(private authService: AuthService,private registerService: RegisterService) {}

  onRegister() {
    console.log(this.password,this.confirmPassword);
    console.log(this.password !== this.confirmPassword);
    
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
        // Gérer la création de compte réussie
      },
      error: e => {
        // Gérer l'erreur de création de compte
      }
    });
  }
}


