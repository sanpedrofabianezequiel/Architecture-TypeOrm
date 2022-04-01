import React from 'react';
import {ScreenContainer} from "../../components";
import {BillHistoryTable, HistoryTable} from "./components";
import {TabPanel, TabView} from "primereact/tabview";

export const History = () => {
  return (
    <ScreenContainer>
      <h1 className="mt-0">History</h1>
      <TabView>
        <TabPanel header="States">
          <HistoryTable type="state" />
        </TabPanel>
        <TabPanel header="Events">
          <HistoryTable type="event" />
        </TabPanel>
        <TabPanel header="Bills">
          <BillHistoryTable />
        </TabPanel>
      </TabView>
    </ScreenContainer>
  );
};
