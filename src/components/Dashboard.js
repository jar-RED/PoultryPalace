import React from 'react';
import MenuBar from './MenuBar';
import DashboardBody from './dashboard-components/DashboardBody';
import DashboardHeader from './dashboard-components/DashboardHeader';

function Dashboard() {
  return (
    <>
    <DashboardHeader />
    <DashboardBody />
    <MenuBar />
    </>
  )
}

export default Dashboard
