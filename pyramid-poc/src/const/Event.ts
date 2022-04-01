import {APEX_EVENT} from "../lib/Apex";

export const EVENT_FROM_VALUE: { [k: number]: number } = {
  [APEX_EVENT.NOTHING]: 1,
  [APEX_EVENT.CHEATED]: 2,
  [APEX_EVENT.REJECTED]: 3,
  [APEX_EVENT.JAMMED]: 4,
  [APEX_EVENT.FULL]: 5,
  [APEX_EVENT.STACKED_PRESENT]: 6,
};

export const getEventIdFromValue = (value: number) => {
  return EVENT_FROM_VALUE[value] || -1;
};
