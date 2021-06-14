import { Skill } from '../shared/skill.model';

export class Member {
  public name: string;
  public company: string;
  public imagePath: string;
  public skills: Skill[];
  public wantedSkills: Skill[];

  constructor(
    name: string,
    company: string,
    imagePath: string,
    skills: Skill[]
  ) {
    this.name = name;
    this.company = company;
    this.imagePath = imagePath;
    this.skills = skills;
  }
}
