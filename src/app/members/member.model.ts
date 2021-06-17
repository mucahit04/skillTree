import { Skill } from '../shared/skill.model';

export class Member {
  public name: string;
  public company: string;
  public imagePath: string;
  public skills: Skill[];
  public uuid: string;

  constructor(
    name: string,
    company: string,
    imagePath: string,
    skills: Skill[],
    uuid: string
  ) {
    this.name = name;
    this.company = company;
    this.imagePath = imagePath;
    this.skills = skills;
    this.uuid = uuid;
  }
}
