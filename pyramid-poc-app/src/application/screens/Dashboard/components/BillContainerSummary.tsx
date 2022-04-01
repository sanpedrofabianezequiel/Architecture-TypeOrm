import React from 'react';
import useSWR from "swr";
import {BillContainerState} from "../../../types";
import {BillSummary} from "./BillSummary";
import {Divider} from "primereact/divider";
import {TotalBillSummary} from "./TotalBillSummary";
import {Card} from "primereact/card";

export interface BillContainerSummaryProps {
  billContainerId: number;
}

export const BillContainerSummary = ({billContainerId}: BillContainerSummaryProps) => {
  const { data: states } = useSWR<BillContainerState[]>(`/bill_container_state/${billContainerId}`, {refreshInterval: 2000});
  const footer = (
    <div>
      <Divider/>
      {!!states && (
        <TotalBillSummary states={states} />
      )}
    </div>
  );
  return (
    <Card className="h-full" subTitle="Bill Summary" title={!!states && !!states[0] ? states[0].billContainer.name : ''} footer={footer}>
      <div>
        {!!states && states.map(state => (
          <BillSummary state={state} key={state.billContainerStateId} />
        ))}
      </div>
    </Card>
  );
};
