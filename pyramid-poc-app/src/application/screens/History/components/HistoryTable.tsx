import React from 'react';
import useSWR from "swr";
import {EventHistory, StateHistory} from "../../../types";
import {HistoryDataTable} from "../../../components";

export interface HistoryTableProps {
  type: 'state' | 'event';
}

export const HistoryTable = ({type}: HistoryTableProps) => {
  const {data = []} = useSWR<StateHistory[] | EventHistory[]>(`/history/${type}?limit=10000`, {refreshInterval:10000});
  return (
    <HistoryDataTable type={type} data={data} scrollHeight="600px" />
  );
};
