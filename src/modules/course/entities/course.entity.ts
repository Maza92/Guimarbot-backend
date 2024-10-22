import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number
}
