import { Component } from '@angular/core';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [BtnComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName: string = '';

  constructor(private router: Router) {}

  enter(): void {
    if (this.userName.trim()) {
      this.router.navigate(['/clients'], { state: { userName: this.userName }});
    }
  }
}
