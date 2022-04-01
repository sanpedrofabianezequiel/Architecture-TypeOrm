import {Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {Bill} from "./Bill";
import {BillContainer} from "./BillContainer";

@Index('bill_container_state_pk', ['billContainerStateId'], { unique: true })
@Entity('bill_container_state', { schema: 'public' })
export class BillContainerState {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bill_container_state_id'})
  billContainerStateId: string;

  @Column('integer', { name: 'quantity' })
  quantity: number;

  @Column('timestamp', { name: 'last_update' })
  lastUpdate: Date;

  @OneToOne(() => Bill)
  @JoinColumn([{ name: "bill_id", referencedColumnName: "billId" }])
  bill: Bill;

  @OneToOne(() => BillContainer)
  @JoinColumn([{ name: "bill_container_id", referencedColumnName: "billContainerId" }])
  billContainer: BillContainer;
}
