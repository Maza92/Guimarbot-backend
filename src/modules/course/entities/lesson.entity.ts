import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Progress } from '@modules/progress'
import { Course } from './course.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 70, nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @Column({ type: 'int', nullable: true })
  durationMinutes: number

  @Column({ length: 100, nullable: true })
  videolURL: string

  @ManyToOne(() => Course, course => course.lessons)
  @JoinColumn()
  course: Relation<Course>

  @OneToMany(() => Progress, process => process.lesson)
  userProgresses: Relation<Progress[]>
}
