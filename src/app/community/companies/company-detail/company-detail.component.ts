import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from 'src/app/members/member.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
})
export class CompanyDetailComponent implements OnInit {
  members: Member[] = [];
  company: Company;
  id: number;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private CompanyService: CompanyService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.company = this.CompanyService.getCompany(this.id);
    });

    this.members = this.company.members;
  }
}
