import {Entity, Index, PrimaryGeneratedColumn, Column} from 'typeorm';

@Index('bill_pk', ['billId'], { unique: true })
@Entity('bill', { schema: 'public' })
export class Bill {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bill_id'})
  billId: string;

  @Column('numeric', { name: 'value' })
  value: number;

  @Column('text', { name: 'name' })
  name: string;
}
