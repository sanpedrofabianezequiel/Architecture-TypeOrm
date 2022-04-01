import {APEX_STATE} from "../lib/Apex";

export const STATE_FROM_VALUE: { [k: number]: number } = {
  [APEX_STATE.OFF]: 1,
  [APEX_STATE.IDLING]: 2,
  [APEX_STATE.ACCEPTING]: 3,
  [APEX_STATE.ESCROWED]: 4,
  [APEX_STATE.STACKING]: 5,
  [APEX_STATE.STACKED]: 6,
  [APEX_STATE.RETURNING]: 7,
  [APEX_STATE.RETURNED]: 8,
  [APEX_STATE.STACK_IDLING]: 10,
};

export const getStateIdFromValue = (value: number) => {
  return STATE_FROM_VALUE[value] || -1;
};
