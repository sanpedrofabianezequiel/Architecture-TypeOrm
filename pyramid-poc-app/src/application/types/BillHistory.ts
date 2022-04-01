import {Bill} from "./Bill";
import {BillContainer} from "./BillContainer";

export interface BillHistory {
  billHistoryId: number;
  createdAt: string;
  quantity: number;
  bill: Bill;
  billContainer: BillContainer;
}
