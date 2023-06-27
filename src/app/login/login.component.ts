import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  redirectToRegister(): void {
    this.router.navigateByUrl('/register');
  }

  onConnexion() {
    
    const credentials = {
      username: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: res => {
        localStorage.setItem('connectedUserEmail',this.email);
        this.authService.setToken(res.token); // Stocke le token dans le localStorage
        this.router.navigate(['/books']); // Redirige l'utilisateur vers la page principale
      },
      error: error => {
        console.error('Erreur de connexion:', error);
        // Affichez un message d'erreur approprié à l'utilisateur ou effectuez d'autres actions
      }
   
    })
  }
}
