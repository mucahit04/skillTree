import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Member } from '../members/member.model';
import { MemberService } from '../members/member.service';
import { Company } from './company.model';

@Injectable()
export class CompanyService {
  companiesChanged = new Subject<Company[]>();

  private companies: Company[] = [];

  constructor(private memberService: MemberService) {}

  private members: Member[] = this.memberService.getmembers();

  setCompanies(companies: Company[]) {
    this.companies = companies;
    this.companiesChanged.next(this.companies.slice());
  }

  getCompanies() {
    return this.companies.slice();
  }

  getCompany(index: number) {
    return this.companies[index];
  }

  addMembersToCompany() {}

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesChanged.next(this.companies.slice());
  }

  updateCompany(index: number, newCompany: Company) {
    this.companies[index] = newCompany;
    this.companiesChanged.next(this.companies.slice());
  }

  deleteCompany(index: number) {
    this.companies.splice(index, 1);
    this.companiesChanged.next(this.companies.slice());
  }
}
