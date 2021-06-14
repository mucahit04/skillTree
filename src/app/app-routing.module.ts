import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembersComponent } from './members/members.component';
import { MemberStartComponent } from './members/member-start/member-start.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MembersResolverService } from './members/members-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CommunityComponent } from './community/community.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillsEditComponent } from './skills/skills-edit/skills-edit.component';
import { SkillStartComponent } from './skills/skill-start/skill-start.component';
import { SkillsResolverService } from './skills/skills-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  {
    path: 'members',
    component: MembersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MemberStartComponent },
      { path: 'new', component: MemberEditComponent },
      {
        path: ':id',
        component: MemberDetailComponent,
        resolve: [MembersResolverService],
      },
      {
        path: ':id/edit',
        component: MemberEditComponent,
        resolve: [MembersResolverService],
      },
    ],
  },
  {
    path: 'community',
    component: CommunityComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
    children: [
      { path: '', component: SkillStartComponent },
      { path: 'new', component: SkillsEditComponent, canActivate: [AuthGuard] },
      {
        path: ':id/edit',
        component: SkillsEditComponent,
        resolve: [SkillsResolverService],
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}