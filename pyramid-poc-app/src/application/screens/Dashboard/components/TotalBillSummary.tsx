import React, {useMemo} from "react";
import {BillContainerState} from "../../../types";
import {LeftRight} from "../../../components";

export interface TotalBillSummaryProps {
  states: BillContainerState[];
}

export const TotalBillSummary = ({states}: TotalBillSummaryProps) => {
  const total = useMemo(() => states.reduce<number>((acum, {quantity}) => acum + quantity, 0), [states]);
  return (
    <LeftRight left="Total of bills:" right={total} />
  );
};
