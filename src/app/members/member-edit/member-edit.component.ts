import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { Skill } from '../../shared/skill.model';
import { SkillsService } from '../../skills/skills.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  uuid: string;
  editMode = false;
  memberForm: FormGroup;
  skillList: Skill[] = [];
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private router: Router,
    private skillService: SkillsService,
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
    let memberDescription = '';
    let memberSkills = new FormArray([]);

    if (this.editMode) {
      const member = this.memberService.getmember(this.uuid);
      memberName = member.name;
      memberImagePath = member.imagePath;
      memberDescription = member.company;

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
      company: new FormControl(memberDescription, Validators.required),
      skills: memberSkills,
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.memberForm.get('skills')).controls;
  }
}
