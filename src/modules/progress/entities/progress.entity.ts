import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Lesson } from '@modules/course'
import { User } from '@modules/user'

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => User, user => user.progress, { nullable: false })
  @JoinColumn()
  user: Relation<User>

  @ManyToOne(() => Lesson, lesson => lesson.userProgresses, { nullable: false })
  @JoinColumn()
  lesson: Relation<Lesson>

  @Column({ default: false, nullable: false })
  completed: boolean

  @Column()
  lastActiveDate: Date
}
