import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Company } from './company.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { CompanyService } from './company.service';

@Injectable({ providedIn: 'root' })
export class CompaniesResolverService implements Resolve<Company[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private companyService: CompanyService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const companies = this.companyService.getCompanies();

    if (companies.length === 0) {
      return this.dataStorageService.fetchCompanies();
    } else {
      return companies;
    }
  }
}
