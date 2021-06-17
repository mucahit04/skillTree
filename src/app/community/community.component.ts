import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onSkills() {
    this.router.navigate(['skills'], { relativeTo: this.route });
  }

  onCompany() {
    this.router.navigate(['company'], { relativeTo: this.route });
  }
}
