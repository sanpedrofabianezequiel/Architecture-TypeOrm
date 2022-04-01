import {State} from "./State";

export interface StateHistory {
  stateHistoryId: number;
  createdAt: string;
  state: State;
}
