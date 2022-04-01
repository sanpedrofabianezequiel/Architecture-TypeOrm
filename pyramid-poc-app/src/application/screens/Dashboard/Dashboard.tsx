import React, {useCallback, useState} from 'react';
import useSWR from 'swr';
import {Card} from 'primereact/card';
import {Image} from "primereact/image";
import {Button} from "primereact/button";
import {ScreenContainer} from "../../components";
import {AnyObject, DeviceState} from "../../types";
import {BillContainerSummary, BillHistoryPanel, HistoryPanel} from "./components";
import {ApiHttpService} from "../../../platform/api";
import {BILL_CONTAINER} from "../../const";
import apex from '../../../assets/images/apex.jpg';

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState('');
  const {data} = useSWR<DeviceState>('/device/state', {refreshInterval: 1000});
  const triggerAction = useCallback(async (name: string, fn) => {
    try {
      setAction(name);
      setLoading(true);
      await fn();
      setLoading(false);
    } catch (e) {
      console.log('error in actions', e);
      alert('Error dispatching ' + name);
      setLoading(false);
    }
  }, []);
  const startAction = useCallback( () => {
    triggerAction('start', () => ApiHttpService.post<AnyObject>('/device/action', {action: 'start'}));
  }, [triggerAction]);
  const stopAction = useCallback(() => {
    triggerAction('stop', () => ApiHttpService.post<AnyObject>('/device/action', {action: 'stop'}));
  }, [triggerAction]);
  const withdrawAction = useCallback(() => {
    triggerAction('withdraw', () => ApiHttpService.post<AnyObject>(`/bill_container_state/transfer`, {
      from: BILL_CONTAINER.APEX_CONTAINER,
      to: BILL_CONTAINER.CASH_BOX,
    }));
  }, [triggerAction]);
  return (
    <ScreenContainer>
      <h1 className="mt-0">Dashboard</h1>
      <div className="grid">
        <div className="col">
          <Card title={`Status: ${!!data && data.state}`} subTitle={`Last Event: ${!!data && data.lastEvent}`}>
            <div className="flex" style={{height: 186}}>
              <div className="flex-1 mr-1" style={{height: 186}}>
                <Image src={apex} alt="apex img" height="186" className="flex justify-content-center" imageClassName="" />
              </div>
              <div className="flex-1 ml-1">
                <div className="grid">
                  <div className="col">
                    <Button label="Start" className="p-button-sm p-button-success w-full" onClick={startAction} disabled={loading} loading={loading && action === 'start'}/>
                  </div>
                  <div className="col">
                    <Button label="Stop" className="p-button-sm p-button-danger w-full" onClick={stopAction} disabled={loading} loading={loading && action === 'stop'}/>
                  </div>
                  <div className="col">
                    <Button label="Withdraw" className="p-button-sm w-full" onClick={withdrawAction} disabled={loading} loading={loading && action === 'withdraw'}/>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col" style={{minWidth:200}}>
          <BillContainerSummary  billContainerId={1}/>
        </div>
        <div className="col" style={{minWidth:200}}>
          <BillContainerSummary  billContainerId={2}/>
        </div>
      </div>
      <div className="grid">
        <div className="col">
          <HistoryPanel type="state" />
        </div>
        <div className="col">
          <HistoryPanel type="event" />
        </div>
        <div className="col">
          <BillHistoryPanel />
        </div>
      </div>
    </ScreenContainer>
  );
};
