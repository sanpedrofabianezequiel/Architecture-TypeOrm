import {Event} from "./Event";

export interface EventHistory {
  eventHistoryId: number;
  createdAt: string;
  event: Event;
}
