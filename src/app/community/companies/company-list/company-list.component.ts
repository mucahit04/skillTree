import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private CompanyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !!user; // if check, user is null or exist?
    });

    this.dataStorageService.fetchCompanies().subscribe();
    this.subscription = this.CompanyService.companiesChanged.subscribe(
      (companies: Company[]) => {
        this.companies = companies;
      }
    );
    this.companies = this.CompanyService.getCompanies();
  }

  onNewCompany() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
