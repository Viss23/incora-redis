import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('storage')
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;
}
