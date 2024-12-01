import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from 'typeorm'
import { Course } from './course.entity'
import { Roadmap } from '@modules/roadmap/entities/roadmap.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Course, course => course.category)
  courses: Course[]

  @OneToMany(() => Roadmap, roadmap => roadmap.category)
  roadmaps: Relation<Roadmap[]>
}
