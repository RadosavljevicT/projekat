import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AnimalType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}