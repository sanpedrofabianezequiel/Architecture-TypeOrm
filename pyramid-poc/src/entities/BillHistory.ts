import {Entity, Index, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {Bill} from "./Bill";
import {BillContainer} from "./BillContainer";

@Index('bill_history_pk', ['billHistoryId'], { unique: true })
@Entity('bill_history', { schema: 'public' })
export class BillHistory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bill_history_id'})
  billHistoryId: string;

  @Column('timestamp', { name: 'created_at' })
  createdAt?: Date;

  @Column('integer', { name: 'quantity' })
  quantity: number;

  @OneToOne(() => Bill)
  @JoinColumn([{ name: "bill_id", referencedColumnName: "billId" }])
  bill: Bill;

  @OneToOne(() => BillContainer)
  @JoinColumn([{ name: "bill_container_id", referencedColumnName: "billContainerId" }])
  billContainer: BillContainer;
}
