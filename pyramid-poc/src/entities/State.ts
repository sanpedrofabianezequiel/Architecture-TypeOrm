import {Entity, Index, PrimaryGeneratedColumn, Column} from 'typeorm';

@Index('state_pk', ['stateId'], { unique: true })
@Entity('state', { schema: 'public' })
export class State {
  @PrimaryGeneratedColumn({ type: 'int', name: 'state_id'})
  stateId: string;

  @Column('numeric', { name: 'value' })
  value: number;

  @Column('text', { name: 'name' })
  name: string;
}
