import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Member } from '../members/member.model';
import { MemberService } from '../members/member.service';
import { CompanyService } from '../companies/company.service';
import { Company } from '../companies/company.model';
import { Skill } from '../shared/skill.model';
import { SkillsService } from '../skills/skills.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private MemberService: MemberService,
    private CompanyService: CompanyService,
    private skillsService: SkillsService
  ) {}

  storemembers() {
    const members = this.MemberService.getmembers();
    this.http
      .put(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/members.json',
        members
      )
      .subscribe((response) => {});
  }

  fetchmembers() {
    return this.http
      .get<Member[]>(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/members.json'
      )
      .pipe(
        map((members) => {
          return members.map((member) => {
            return {
              ...member,
              skills: member.skills ? member.skills : [],
            };
          });
        }),
        tap((members) => {
          this.MemberService.setmembers(members);
        })
      );
  }

  storeSkills() {
    const skills = this.skillsService.getSkills();
    this.http
      .put(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/skills.json',
        skills
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchSkills() {
    return this.http
      .get<Skill[]>(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/skills.json'
      )
      .pipe(
        map((skills) => {
          return skills;
        }),
        tap((skills) => {
          this.skillsService.setSkills(skills);
        })
      );
  }

  storeCompanies() {
    const companies = this.CompanyService.getCompanies();
    this.http
      .put(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/companies.json',
        companies
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchCompanies() {
    return this.http
      .get<Company[]>(
        'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/companies.json'
      )
      .pipe(
        map((companies) => {
          return companies.map((company) => {
            return {
              ...company,
              members: company.members ? company.members : [],
            };
          });
        }),
        tap((companies) => {
          this.CompanyService.setCompanies(companies);
        })
      );
  }
}
