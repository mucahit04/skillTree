import { Member } from '../members/member.model';

export class Company {
  public name: string;
  public members: Member[];
  public imagePath: string;

  constructor(name: string, members: Member[], imagePath: string) {
    this.name = name;
    this.members = members;
    this.imagePath = imagePath;
  }
}
