import { Entity, PrimaryKey, Property, Enum, Collection, ManyToMany } from '@mikro-orm/core';
import { Label } from './label';

@Entity()
export class Issue {

  @PrimaryKey()
  id!: number;

  @Property()
  description!: string;

  @Property()
  title!: string;

  @Property()
  place!: string;

  @Enum()
  status: IssueStatus = IssueStatus.NEW;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  modifiedAt: Date = new Date();

  @ManyToMany(() => Label, 'issues', { owner: true })
  labels = new Collection<Label>(this);

}

export enum IssueStatus {
  NEW = 'NEW',
  DOING = 'DOING',
  DONE = 'DONE',
}
