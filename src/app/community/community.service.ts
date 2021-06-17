import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MemberService } from '../members/member.service';

@Injectable()
export class CommunityService {
  constructor(private memberService: MemberService, private http: HttpClient) {}

  getMembers() {
    return this.http.get(
      'https://skilltree-fe6b4-default-rtdb.europe-west1.firebasedatabase.app/members.json'
    );
  }
}
