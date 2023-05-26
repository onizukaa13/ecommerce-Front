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

  onConnexion() {
    console.log('Email:', this.email);
    console.log('Mot de passe:', this.password);
    const credentials = {
      username: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: res => {
        console.log(res);
        this.authService.setToken(res.token); // Stocke le token dans le localStorage
        this.router.navigate(['/books']); // Redirige l'utilisateur vers la page principale
      },
      error: e => {
        'Erreur de Connexion'
      }
    });
  }
}