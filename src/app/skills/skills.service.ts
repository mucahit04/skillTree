import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Skill } from '../shared/skill.model';

@Injectable()
export class SkillsService {
  skillsChanged = new Subject<Skill[]>();

  private skills: Skill[] = [];
  skillTypes = [{ name: 'hardware' }, { name: 'software' }];

  constructor() {}

  setSkills(skills: Skill[]) {
    this.skills = skills;
    this.skillsChanged.next(this.skills.slice());
  }

  getSkills() {
    return this.skills.slice();
  }

  getSkill(index: number) {
    return this.skills[index];
  }

  addSkill(skill: Skill) {
    this.skills.push(skill);
    this.skillsChanged.next(this.skills.slice());
  }

  updateSkill(index: number, newSkill: Skill) {
    this.skills[index] = newSkill;
    this.skillsChanged.next(this.skills.slice());
  }

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
    this.skillsChanged.next(this.skills.slice());
  }
}
