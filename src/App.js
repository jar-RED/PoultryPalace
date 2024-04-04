import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import InventoryDefault from "./components/InventoryDefault";
import SalesMain from "./components/SalesMain";
import InventoryList from "./components/inventory-components/InventoryList";
import InventoryOrders from "./components/inventory-components/InventoryOrders";
import SalesList from "./components/sales/SalesList";
import SalesInvoice from "./components/sales/SalesInvoice";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryDefault />} />
          <Route path="/sales" element={<SalesMain />} />
          <Route path="/inventory-list" element={<InventoryList />} />
          <Route path="/inventory-orders" element={<InventoryOrders />} />
          <Route path="/sales-list" element={<SalesList />} />
          <Route path="/sales-invoice" element={<SalesInvoice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
