export enum APEX_STATE {
  OFF = 0,
  IDLING = 1,
  ACCEPTING = 2,
  ESCROWED = 4,
  STACKING = 8,
  STACKED = 16,
  RETURNING = 32,
  RETURNED = 64,
  STACK_IDLING = 17,
  RETURNED_IDLING = 65,
}

export const APEX_STATE_STR: any = {
  [APEX_STATE.OFF]: 'Off',
  [APEX_STATE.IDLING]: 'Idling',
  [APEX_STATE.ACCEPTING]: 'Accepting',
  [APEX_STATE.ESCROWED]: 'Escrowed',
  [APEX_STATE.STACKING]: 'Stacking',
  [APEX_STATE.STACKED]: 'Stacked',
  [APEX_STATE.RETURNING]: 'Returning',
  [APEX_STATE.RETURNED]: 'Returned',
  [APEX_STATE.STACK_IDLING]: 'Stack Idling',
  [APEX_STATE.RETURNED_IDLING]: 'Returning Idling',
  fallback: 'Unknown',
}

export enum APEX_EVENT {
  NOTHING = 0,
  CHEATED = 1,
  REJECTED = 2,
  JAMMED = 4,
  FULL = 8,
  STACKED_PRESENT = 16,
}

export const APEX_EVENT_STR: any = {
  [APEX_EVENT.NOTHING]: '',
  [APEX_EVENT.CHEATED]: 'Cheated',
  [APEX_EVENT.REJECTED]: 'Rejected',
  [APEX_EVENT.JAMMED]: 'Jammed',
  [APEX_EVENT.FULL]: 'Full',
  [APEX_EVENT.STACKED_PRESENT]: 'Stacked Present',
  fallback: 'Unknown',
}
