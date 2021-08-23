import { Company } from '../community/companies/company.model';
import { Skill } from '../shared/skill.model';

export class Member {
  public name: string;
  public companies: Company[];
  public imagePath: string;
  public skills: Skill[];
  public uuid: string;

  constructor(
    name: string,
    companies: Company[],
    imagePath: string,
    skills: Skill[],
    uuid: string
  ) {
    this.name = name;
    this.companies = companies;
    this.imagePath = imagePath;
    this.skills = skills;
    this.uuid = uuid;
  }
}
