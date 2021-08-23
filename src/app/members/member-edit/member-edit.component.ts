import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { Skill } from '../../shared/skill.model';
import { SkillsService } from '../../skills/skills.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/community/companies/company.model';
import { CompanyService } from 'src/app/community/companies/company.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  uuid: string;
  editMode = false;
  memberForm: FormGroup;
  companyList: Company[] = [];
  skillList: Skill[] = [];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private router: Router,
    private skillService: SkillsService,
    private companyService: CompanyService,
    private dtStrgService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.uuid = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

    this.dtStrgService.fetchSkills().subscribe();
    this.subscription = this.skillService.skillsChanged.subscribe(
      (skills: Skill[]) => {
        this.skillList = skills;
      }
    );
    this.skillList = this.skillService.getSkills();

    this.dtStrgService.fetchCompanies().subscribe();
    this.subscription = this.companyService.companiesChanged.subscribe(
      (companies: Company[]) => {
        this.companyList = companies;
      }
    );
    this.companyList = this.companyService.getCompanies();
  }

  onSubmit() {
    if (this.editMode) {
      this.memberService.updatemember(this.uuid, this.memberForm.value);
      this.dtStrgService.storemembers();
    } else {
      this.memberService.addmember(this.memberForm.value);
      this.dtStrgService.storemembers();
    }
    this.onCancel();
  }

  onAddCompany() {
    (<FormArray>this.memberForm.get('companies')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteCompany(index: number) {
    (<FormArray>this.memberForm.get('companies')).removeAt(index);
  }

  onAddSkill() {
    (<FormArray>this.memberForm.get('skills')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        degree: new FormControl(null),
      })
    );
  }

  onDeleteSkill(index: number) {
    (<FormArray>this.memberForm.get('skills')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let memberName = '';
    let memberImagePath = '';
    let memberCompanies = new FormArray([]);
    let memberSkills = new FormArray([]);

    if (this.editMode) {
      const member = this.memberService.getmember(this.uuid);
      memberName = member.name;
      memberImagePath = member.imagePath;

      if (member['companies']) {
        for (let company of member.companies) {
          memberCompanies.push(
            new FormGroup({
              name: new FormControl(company.name, Validators.required),
            })
          );
        }
      }

      if (member['skills']) {
        for (let skill of member.skills) {
          memberSkills.push(
            new FormGroup({
              name: new FormControl(skill.name, Validators.required),
              degree: new FormControl(skill.degree, [Validators.required]),
            })
          );
        }
      }
    }

    this.memberForm = new FormGroup({
      name: new FormControl(memberName, Validators.required),
      imagePath: new FormControl(memberImagePath, Validators.required),
      companies: memberCompanies,
      skills: memberSkills,
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.memberForm.get('skills')).controls;
  }

  get companyControls() {
    return (<FormArray>this.memberForm.get('companies')).controls;
  }
}
