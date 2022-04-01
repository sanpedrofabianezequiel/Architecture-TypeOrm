import React from 'react';
import useSWR from "swr";
import {Card} from "primereact/card";
import {EventHistory, StateHistory} from "../../../types";
import {HistoryDataTable, SeeMoreButton} from "../../../components";

export interface HistoryPanelProps {
  type: 'event' | 'state';
}

export const HistoryPanel = ({type}: HistoryPanelProps) => {
  const {data = []} = useSWR<StateHistory[] | EventHistory[]>(`/history/${type}`, {refreshInterval:1000});
  return (
    <Card subTitle="History" title={type.toUpperCase()} footer={<SeeMoreButton />}>
      <div style={{minHeight: 180}}>
        <HistoryDataTable type={type} data={data} scrollHeight="180px" />
      </div>
    </Card>
  );
};
