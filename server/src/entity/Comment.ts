import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  postId: number;

  @Column()
  userId: number;

  @Column()
  content: string;


  @ManyToOne(() => Post, p => p.comments, { onDelete: "CASCADE", onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}