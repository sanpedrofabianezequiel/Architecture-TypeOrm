import {Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {State} from "./State";

@Index('state_history_pk', ['stateHistoryId'], { unique: true })
@Entity('state_history', { schema: 'public' })
export class StateHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'state_history_id'})
  stateHistoryId: string;

  @Column('timestamp', { name: 'created_at' })
  createdAt?: Date;

  @OneToOne(() => State)
  @JoinColumn([{ name: "state_id", referencedColumnName: "stateId" }])
  state: State;
}
