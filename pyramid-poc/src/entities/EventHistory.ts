import {Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {Event} from "./Event";

@Index('event_history_pk', ['eventHistoryId'], { unique: true })
@Entity('event_history', { schema: 'public' })
export class EventHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'event_history_id'})
  eventHistoryId: string;

  @Column('timestamp', { name: 'created_at' })
  createdAt?: Date;

  @OneToOne(() => Event)
  @JoinColumn([{ name: "event_id", referencedColumnName: "eventId" }])
  event: Event;
}
