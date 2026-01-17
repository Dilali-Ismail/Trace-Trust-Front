import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  message = '';
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['CLIENT', Validators.required] // Rôle par défaut
    });
  }
  onSubmit() {
    console.log('[Register] Form submitted. Valid:', this.registerForm.valid, this.registerForm.value);
    if (this.registerForm.invalid) {
      this.message = "Veuillez remplir tous les champs correctement.";
      return;
    }
    this.loading = true;
    console.log('[Register] Calling AuthService.register...');
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.message = "Compte créé ! Redirection vers la page de login...";
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.message = "Erreur lors de l'inscription.";
        this.loading = false;
      }
    });
  }
}
