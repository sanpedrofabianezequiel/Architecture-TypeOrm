import React from 'react';
import useSWR from "swr";
import {BillHistory} from "../../../types";
import {BillHistoryDataTable} from "../../../components";

export const BillHistoryTable = () => {
  const {data = []} = useSWR<BillHistory[]>('/history/bill?limit=10000', {refreshInterval:10000});
  return (
    <BillHistoryDataTable scrollHeight="600px" data={data} />
  );
};
