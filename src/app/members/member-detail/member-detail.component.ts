import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import { Member } from '../member.model';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member;
  id: string;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private MemberService: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.member = this.MemberService.getmember(this.id);
    });
  }

  onEditmember() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeletemember() {
    this.MemberService.deletemember(this.id);
    this.dataStorageService.storemembers();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
