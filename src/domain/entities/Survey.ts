import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Question, IQuestion } from './Question';

@Entity()
export class Survey extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  targetAudience: string;

  @Column('jsonb')
  questions: Question[];
}

export interface ISurvey {
  id?: string,
  name?: string,
  targetAudience?: string,
  questions?: IQuestion[]
}