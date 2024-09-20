import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { IQuestion, Question } from './Question';

@Entity()
export class FilledSurvey extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  answer: any;
}

export interface IFilledSurvey {
  id?:string;
  question?: IQuestion,
  answer?: any;
}