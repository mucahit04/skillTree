import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsService } from '../skills.service';
import { Skill } from '../../shared/skill.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css'],
})
export class SkillsListComponent implements OnInit, OnDestroy {
  skillListUpdated = false;
  skills: Skill[];
  subscription: Subscription;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private skillsService: SkillsService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private dtStrgService: DataStorageService
  ) {}

  ngOnInit() {
    this.dtStrgService.fetchSkills().subscribe();
    this.subscription = this.skillsService.skillsChanged.subscribe(
      (skills: Skill[]) => {
        this.skills = skills;
      }
    );
    this.skills = this.skillsService.getSkills();

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // if check, user is null or exist?
    });
  }

  onNewSkill() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onStoreSkills() {
    this.dtStrgService.storeSkills();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
