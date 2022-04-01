import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {MainLayout} from "../../layouts";
import {Dashboard, History} from "../../screens";

export const MainRouter = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="" element={<Dashboard />} />
      <Route path="history" element={<History />} />
    </Route>
  </Routes>
);
