import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UUID } from 'angular2-uuid';

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

  getmember(id: string) {
    return this.members.find((member) => member.uuid == id);
  }

  addmember(member: Member) {
    member.uuid = UUID.UUID();
    this.members.push(member);
    this.membersChanged.next(this.members.slice());
  }

  updatemember(uuid: string, updatedMember: Member) {
    let foundIndex = this.members.findIndex((member) => member.uuid == uuid);
    updatedMember.uuid = uuid;
    this.members[foundIndex] = updatedMember;
    this.membersChanged.next(this.members.slice());
  }

  deletemember(id: string) {
    this.members = this.members.filter((member) => member.uuid !== id);
    this.membersChanged.next(this.members.slice());
  }
}
