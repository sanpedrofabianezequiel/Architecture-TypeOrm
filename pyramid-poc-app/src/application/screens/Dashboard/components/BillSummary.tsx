import React from "react";
import {BillContainerState} from "../../../types";
import {LeftRight} from "../../../components";

export interface BillSummaryProps {
  state: BillContainerState,
}

export const BillSummary = ({ state: { bill, quantity } }: BillSummaryProps) => (
  <LeftRight left={`Bill #${bill.billId} (${bill.name}):`} right={quantity} />
);
