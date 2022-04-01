import {Entity, Index, PrimaryGeneratedColumn, Column} from 'typeorm';

@Index('bill_container_pk', ['billContainerId'], { unique: true })
@Entity('bill_container', { schema: 'public' })
export class BillContainer {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bill_container_id'})
  billContainerId: string;

  @Column('text', { name: 'name' })
  name: string;
}
