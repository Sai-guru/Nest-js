import { User } from "src/auth/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:50})
  title!: string;

  @Column({type:'text', nullable:true})
  content!: string;

  // @Column({length:100})
  // authorName!: string;

  //after admin creation managing with posts , we do this..
  @ManyToOne(() => User, (user) => user.posts)
  authorName!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })                                            
  updatedAt?: Date;
}
