import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from './member.model';
import { MemberService } from './member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  members: Member[];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.subscription = this.memberService.membersChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
        this.members = this.memberService.getmembers();
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
