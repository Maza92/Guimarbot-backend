import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm'
import { Lesson } from './lesson.entity'

@Entity()
export class Video {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: true })
  description: string

  @Column()
  viewURL: string

  @ManyToOne(() => Lesson, lesson => lesson.videos)
  @JoinColumn()
  lesson: Relation<Lesson>
}
