import React from 'react';
import useSWR from "swr";
import {Card} from "primereact/card";
import {BillHistory} from "../../../types";
import {BillHistoryDataTable, SeeMoreButton} from "../../../components";

export const BillHistoryPanel = () => {
  const {data =[]} = useSWR<BillHistory[]>('/history/bill', {refreshInterval:1000});
  return (
    <Card subTitle="History" title="BILL" footer={<SeeMoreButton />}>
      <div style={{minHeight: 180}}>
        <BillHistoryDataTable scrollHeight="180px" data={data} />
      </div>
    </Card>
  );
};
