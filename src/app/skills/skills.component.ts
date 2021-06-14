import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../shared/skill.model';
import { SkillsService } from './skills.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  subscription: Subscription;
  skillsChanged = new Subject<Skill[]>();

  skills: Skill[] = [];

  constructor(
    private http: HttpClient,
    private skillsService: SkillsService,
    private dtStrgService: DataStorageService
  ) {}

  ngOnInit() {
    this.dtStrgService.fetchmembers().subscribe();
    this.subscription = this.skillsService.skillsChanged.subscribe(
      (skills: Skill[]) => {
        this.skills = skills;
      }
    );
    this.skills = this.skillsService.getSkills();
  }
}
