import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Progress } from '@modules/progress'
import { Course } from './course.entity'
import { Video } from './video.entity'

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Course, course => course.lessons)
  @JoinColumn()
  course: Relation<Course>

  @OneToMany(() => Video, video => video.lesson)
  videos: Relation<Video[]>

  @OneToMany(() => Progress, process => process.lesson)
  userProgresses: Relation<Progress[]>
}
