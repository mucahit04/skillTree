import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Member } from './member.model';
import { DataStorageService } from '../shared/data-storage.service';
import { MemberService } from './member.service';

@Injectable({ providedIn: 'root' })
export class MembersResolverService implements Resolve<Member[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private memberService: MemberService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const members = this.memberService.getmembers();

    if (members.length === 0) {
      return this.dataStorageService.fetchmembers();
    } else {
      return members;
    }
  }
}
