import React from 'react';
import {Column} from "primereact/column";
import moment from "moment";
import {DataTable} from "primereact/datatable";
import {EventHistory, StateHistory} from "../../types";

export interface HistoryDataTableProps {
  scrollHeight: string;
  data: StateHistory[] | EventHistory[];
  type: 'event' | 'state';
}

export const HistoryDataTable = ({data, type, scrollHeight}: HistoryDataTableProps) => (
  <DataTable value={data} scrollable scrollHeight={scrollHeight}>
    <Column body={row => moment(row.createdAt).format('MM/DD/YYYY HH:mm:ss')} header="Date" />
    <Column field={`${type}.name`} header={type} className="capitalize" />
  </DataTable>
);
