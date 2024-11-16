import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Course } from './course.entity'

@Entity()
export class Career {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 60, nullable: true })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @OneToMany(() => Course, course => course.career)
  courses: Relation<Course[]>
}
