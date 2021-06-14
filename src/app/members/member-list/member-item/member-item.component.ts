import { Component, OnInit, Input } from '@angular/core';

import { Member } from '../../member.model';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css'],
})
export class MemberItemComponent implements OnInit {
  @Input() member: Member;
  @Input() index: number;

  ngOnInit() {}
}
