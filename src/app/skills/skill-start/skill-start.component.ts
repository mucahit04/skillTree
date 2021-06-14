import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-skill-start',
  templateUrl: './skill-start.component.html',
  styleUrls: ['./skill-start.component.css'],
})
export class SkillStartComponent implements OnInit {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // if check, user is null or exist?
    });
  }
}
