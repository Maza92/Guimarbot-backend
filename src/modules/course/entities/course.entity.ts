import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
