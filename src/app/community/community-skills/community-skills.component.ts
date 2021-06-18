import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/members/member.model';
import { MemberService } from 'src/app/members/member.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Skill } from 'src/app/shared/skill.model';
import { SkillsService } from 'src/app/skills/skills.service';

@Component({
  selector: 'app-community-skills',
  templateUrl: './community-skills.component.html',
  styleUrls: ['./community-skills.component.css'],
})
export class CommunitySkillsComponent implements OnInit {
  members: Member[];
  subscription: Subscription;
  skill: string = null;
  hasThisSkill: Member[] = [];
  allSkills: Skill[] = [];

  constructor(
    private memberService: MemberService,
    private dtStrgService: DataStorageService,
    private skillService: SkillsService
  ) {}

  ngOnInit() {
    this.dtStrgService.fetchSkills().subscribe();
    this.subscription = this.skillService.skillsChanged.subscribe(
      (skills: Skill[]) => {
        this.allSkills = skills;
      }
    );
    this.allSkills = this.skillService.getSkills();

    this.dtStrgService.fetchmembers().subscribe();
    this.subscription = this.memberService.membersChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
    this.members = this.memberService.getmembers();
  }

  membersOfSkill() {
    this.hasThisSkill = [];
    for (let i = 0; i < this.members.length; i++) {
      for (let index = 0; index < this.members[i].skills.length; index++) {
        if (this.members[i].skills[index].name == this.skill) {
          this.hasThisSkill.push(this.members[i]);
        }
      }
    }
  }
}
