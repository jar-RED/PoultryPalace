import React, { Children, useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import InventoryDefault from "./components/InventoryDefault";
import SalesMain from "./components/SalesMain";
import InventoryList from "./components/inventory-components/InventoryList";
import InventoryOrders from "./components/inventory-components/InventoryOrders";
import SalesList from "./components/sales/SalesList";
import SalesInvoice from "./components/sales/SalesInvoice";
import { AuthContext } from "./components/login-context/AuthContext";
import Reports from "./components/reports-component/Reports";
import Notification from "./components/notifications/Notification";
import { NotificationProvider } from "./components/notifications/NotificationProvider";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/" />;
  };

  console.log(currentUser);

  return (
    <NotificationProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/inventory"
              element={
                <RequireAuth>
                  <InventoryDefault />
                </RequireAuth>
              }
            />
            <Route
              path="/sales"
              element={
                <RequireAuth>
                  <SalesMain />
                </RequireAuth>
              }
            />
            <Route
              path="/inventory-list"
              element={
                <RequireAuth>
                  <InventoryList />
                </RequireAuth>
              }
            />
            <Route
              path="/inventory-orders"
              element={
                <RequireAuth>
                  <InventoryOrders />
                </RequireAuth>
              }
            />
            <Route
              path="/sales-list"
              element={
                <RequireAuth>
                  <SalesList />
                </RequireAuth>
              }
            />
            <Route
              path="/sales-invoice"
              element={
                <RequireAuth>
                  <SalesInvoice />
                </RequireAuth>
              }
            />
            <Route
              path="/reports"
              element={
                <RequireAuth>
                  <Reports />
                </RequireAuth>
              }
            />
            <Route
              path="/notification"
              element={
                <RequireAuth>
                  <Notification />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
