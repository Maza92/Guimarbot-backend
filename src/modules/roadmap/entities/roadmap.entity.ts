import { Course } from '@modules/course'
import { Category } from '@modules/course/entities/category.entity'
import { Level } from '@modules/course/types'
import { User } from '@modules/user'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Roadmap {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 100, nullable: false })
  title: string

  @Column({ length: 500, nullable: false })
  description: string

  @Column({ nullable: false })
  estimatedDuration: number

  @Column({ nullable: false })
  isPublic: boolean

  @Column({ nullable: false })
  isDefault: boolean

  @Column({
    type: 'enum',
    enum: Level,
    nullable: false,
  })
  level: Level

  @ManyToOne(() => Category, category => category.roadmaps)
  category: Relation<Category>

  @ManyToOne(() => User, user => user.roadmaps, { nullable: true })
  user: Relation<User>

  @OneToMany(() => Course, course => course.roadmap)
  courses: Relation<Course[]>

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
