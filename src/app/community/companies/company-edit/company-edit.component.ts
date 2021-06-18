import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  id: number;
  editMode = false;
  companyForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
    private dataStorageService: DataStorageService
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
      this.companyService.updateCompany(this.id, this.companyForm.value);
      this.dataStorageService.storeCompanies();
    } else {
      this.companyService.addCompany(this.companyForm.value);
      this.dataStorageService.storeCompanies();
    }
    this.onCancel();
  }

  onAddMember() {
    (<FormArray>this.companyForm.get('members')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteMember(index: number) {
    (<FormArray>this.companyForm.get('members')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let companyName = '';
    let companyImagePath = '';
    let companyMembers = new FormArray([]);

    if (this.editMode) {
      const company = this.companyService.getCompany(this.id);
      companyName = company.name;
      companyImagePath = company.imagePath;

      if (company['members']) {
        for (let member of company.members) {
          companyMembers.push(
            new FormGroup({
              name: new FormControl(member.name, Validators.required),
            })
          );
        }
      }
    }

    this.companyForm = new FormGroup({
      name: new FormControl(companyName, Validators.required),
      imagePath: new FormControl(companyImagePath, Validators.required),
      members: companyMembers,
    });
  }
  get controls() {
    // a getter!
    return (<FormArray>this.companyForm.get('members')).controls;
  }
}
