import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./Comment";
import { AnimalType } from "./AnimalType";
import { User } from "./User";


@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  animalTypeId: number;

  @Column()
  userId: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, u => u.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => AnimalType)
  @JoinColumn({ name: 'animalTypeId' })
  animalType: AnimalType;

  @OneToMany(() => Comment, c => c.post)
  comments: Comment[];
}