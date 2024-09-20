import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { EAnswerType } from '../enums/EAnswerType';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionStatement: string;

  @Column({
    type: 'enum',
    enum: EAnswerType,
  })
  answerType: EAnswerType;
}

export interface IQuestion {
  id?:string;
  answerType?: EAnswerType,
}