import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from '../members/member.model';
import { MemberService } from '../members/member.service';
import { DataStorageService } from '../shared/data-storage.service';
import { CommunityService } from './community.service';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  members: Member[];
  subscription: Subscription;

  constructor(
    private communityService: CommunityService,
    private memberService: MemberService,
    private dtStrgService: DataStorageService
  ) {}

  ngOnInit() {
    this.dtStrgService.fetchmembers().subscribe();
    this.subscription = this.memberService.membersChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
    this.members = this.memberService.getmembers();
  }
}
