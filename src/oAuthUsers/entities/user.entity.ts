import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class OAuthUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150, unique: true })
  email!: string;

  @Column({ length: 150 })
  displayName!: string;

  @Column({ length: 50 })
  provider!: string;

  @Column({ length: 200 })
  providerId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;
}
