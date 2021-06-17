import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MembersComponent } from './members/members.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberItemComponent } from './members/member-list/member-item/member-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { MemberStartComponent } from './members/member-start/member-start.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberService } from './members/member.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyStartComponent } from './companies/company-start/company-start.component';
import { CompanyDetailComponent } from './companies/company-detail/company-detail.component';
import { CompanyEditComponent } from './companies/company-edit/company-edit.component';
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { CompanyItemComponent } from './companies/company-list/company-item/company-item.component';
import { CompanyService } from './companies/company.service';
import { CommunityComponent } from './community/community.component';
import { CommunityService } from './community/community.service';
import { SkillsComponent } from './skills/skills.component';
import { SkillsEditComponent } from './skills/skills-edit/skills-edit.component';
import { SkillsService } from './skills/skills.service';
import { SkillsListComponent } from './skills/skills-list/skills-list.component';
import { SkillItemComponent } from './skills/skills-list/skill-item/skill-item.component';
import { SkillStartComponent } from './skills/skill-start/skill-start.component';
import { CommunityMembersComponent } from './community/community-members/community-members.component';
import { CommunitySkillsComponent } from './community/community-skills/community-skills.component';
import { CompanySkillsComponent } from './community/company-skills/company-skills.component';
import { CommunityStartComponent } from './community/community-start/community-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersComponent,
    MemberListComponent,
    MemberDetailComponent,
    MemberItemComponent,
    DropdownDirective,
    MemberStartComponent,
    MemberEditComponent,
    AuthComponent,
    LoadingSinnerComponent,
    CompaniesComponent,
    CompanyStartComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyItemComponent,
    CommunityComponent,
    SkillsComponent,
    SkillsEditComponent,
    SkillsListComponent,
    SkillItemComponent,
    SkillStartComponent,
    CommunityMembersComponent,
    CommunitySkillsComponent,
    CompanySkillsComponent,
    CommunityStartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    MemberService,
    CompanyService,
    SkillsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    CommunityService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
