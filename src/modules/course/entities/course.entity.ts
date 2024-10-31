import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { Lesson } from './lesson.entity'
import { Tag } from './tag.entity'
import { Category } from './category.entity'

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 100, nullable: false })
  title: string

  @Column({ length: 500, nullable: false })
  description: string

  @Column({ nullable: false })
  price: number

  @Column({ nullable: false })
  videoPreviewUrl: string

  @Column({ length: 50, nullable: false })
  teacherName: string

  @Column({ nullable: false })
  durationHours: number

  @Column({ nullable: false })
  totalLessons: number

  @Column({ nullable: true })
  averageRating: number

  @Column({ default: false, nullable: true })
  isPublished: boolean

  @OneToMany(() => Lesson, lesson => lesson.course, {
    cascade: ['recover', 'insert', 'update'],
  })
  lessons: Relation<Lesson[]>

  @ManyToMany(() => Tag, tag => tag.courses)
  tags: Tag[]

  @ManyToOne(() => Category, category => category.courses)
  category: Category

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
