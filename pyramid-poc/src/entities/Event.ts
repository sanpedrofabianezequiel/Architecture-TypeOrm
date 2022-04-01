import {Entity, Index, PrimaryGeneratedColumn, Column} from 'typeorm';

@Index('event_pk', ['eventId'], { unique: true })
@Entity('event', { schema: 'public' })
export class Event {
  @PrimaryGeneratedColumn({ type: 'int', name: 'event_id'})
  eventId: string;

  @Column('numeric', { name: 'value' })
  value: number;

  @Column('text', { name: 'name' })
  name: string;
}
