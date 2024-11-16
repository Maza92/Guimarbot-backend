import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Course } from './course.entity'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Course, course => course.tags)
  @JoinTable()
  courses: Course[]
}
