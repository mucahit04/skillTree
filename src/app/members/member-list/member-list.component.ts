import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Member } from '../member.model';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[];
  subscription: Subscription;

  constructor(
    private MemberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private dtStrgService: DataStorageService
  ) {}

  ngOnInit() {
    this.dtStrgService.fetchmembers().subscribe();
    this.subscription = this.MemberService.membersChanged.subscribe(
      (members: Member[]) => {
        this.members = members;
      }
    );
    this.members = this.MemberService.getmembers();
  }

  onNewmember() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
