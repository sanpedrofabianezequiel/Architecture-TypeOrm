import React from 'react';
import {BillHistory} from "../../types";
import {Column} from "primereact/column";
import moment from "moment";
import {DataTable} from "primereact/datatable";

export interface BillHistoryDataTableProps {
  scrollHeight: string;
  data: BillHistory[];
}

export const BillHistoryDataTable = ({data, scrollHeight}:BillHistoryDataTableProps) => (
  <DataTable value={data} scrollable scrollHeight={scrollHeight}>
    <Column body={row => moment(row.createdAt).format('MM/DD/YYYY HH:mm:ss')} header="Date" />
    <Column field="billContainer.name" header="Container" />
    <Column field="bill.name" header="Bill" />
    <Column body={row => row.quantity > 0 ? `+${row.quantity}` : row.quantity} header="Quantity" />
  </DataTable>
);
