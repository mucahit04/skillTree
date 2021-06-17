import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Skill } from '../../../shared/skill.model';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit, OnDestroy {
  @Input() skill: Skill;
  @Input() index: number;
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // if check, user is null or exist?
    });
  }
  onEditSkill(index) {
    this.router.navigate([index + '/edit'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
