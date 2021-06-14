import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Member } from './member.model';

@Injectable()
export class MemberService {
  membersChanged = new Subject<Member[]>();

  private members: Member[] = [];

  constructor() {}

  setmembers(members: Member[]) {
    this.members = members;
    this.membersChanged.next(this.members.slice());
  }

  getmembers() {
    return this.members.slice();
  }

  getmember(index: number) {
    return this.members[index];
  }

  addmember(member: Member) {
    this.members.push(member);
    this.membersChanged.next(this.members.slice());
  }

  updatemember(index: number, newmember: Member) {
    this.members[index] = newmember;
    this.membersChanged.next(this.members.slice());
  }

  deletemember(index: number) {
    this.members.splice(index, 1);
    this.membersChanged.next(this.members.slice());
  }
}
