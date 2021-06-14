import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Skill } from '../shared/skill.model';
import { DataStorageService } from '../shared/data-storage.service';
import { SkillsService } from './skills.service';

@Injectable({ providedIn: 'root' })
export class SkillsResolverService implements Resolve<Skill[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private skillService: SkillsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const skills = this.skillService.getSkills();

    if (skills.length === 0) {
      return this.dataStorageService.fetchSkills();
    } else {
      return skills;
    }
  }
}
