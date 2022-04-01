import {Bill} from "./Bill";
import {BillContainer} from "./BillContainer";

export interface BillContainerState {
  billContainerStateId: string;
  quantity: number;
  lastUpdate: Date;
  bill: Bill;
  billContainer: BillContainer;
}
