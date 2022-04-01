import React, {useMemo} from 'react';
import {Menubar} from 'primereact/menubar';
import {MenuItem} from "primereact/menuitem";
import {Image} from "primereact/image";
import {PrimeIcons} from 'primereact/api';
import {Outlet, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

export const MainLayout = () => {
  const navigate = useNavigate();
  const items = useMemo<MenuItem[]>(() => [
    {
      label:'Dashboard',
      icon: PrimeIcons.BARS,
      command() { navigate('/'); }
    },
    {
      label:'History',
      icon: PrimeIcons.MOON,
      command() { navigate('/history'); }
    },
  ], [navigate]);
  return (
    <div className="min-h-screen">
      <div className="app-header fixed top-0 left-0 right-0">
        <Menubar
          className="border-noround"
          model={items}
          start={<Image src={logo} alt="Logo" height="40" className="m-2"/>}
        />
      </div>
      <div className="app-content" style={{paddingTop: 61}}>
        <Outlet/>
      </div>
    </div>
  );
};
