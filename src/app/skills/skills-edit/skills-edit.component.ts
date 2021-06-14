import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { SkillsService } from '../skills.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-skills-edit',
  templateUrl: './skills-edit.component.html',
  styleUrls: ['./skills-edit.component.css'],
})
export class SkillsEditComponent implements OnInit {
  id: number;
  editMode = false;
  skillForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private skillsService: SkillsService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.skillsService.updateSkill(this.id, this.skillForm.value);
      this.dataStorageService.storeSkills();
    } else {
      this.skillsService.addSkill(this.skillForm.value);
      this.dataStorageService.storeSkills();
    }
    this.onCancel();
  }
  onDeleteSkill() {
    this.skillsService.deleteSkill(this.id);
    this.dataStorageService.storeSkills();
    this.router.navigate(['/skills']);
  }

  onCancel() {
    this.router.navigate(['/skills']);
  }

  private initForm() {
    let skillName = '';
    let skillDegree: number = 0;
    let skillType: string = '';

    if (this.editMode) {
      const skill = this.skillsService.getSkill(this.id);
      skillName = skill.name;
      skillDegree = skill.degree;
      skillType = skill.type;
    }

    this.skillForm = new FormGroup({
      name: new FormControl(skillName, Validators.required),
      degree: new FormControl(skillDegree, Validators.required),
      type: new FormControl(skillType, Validators.required),
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.skillForm.get('skills')).controls;
  }
}
