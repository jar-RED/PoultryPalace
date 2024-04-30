import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import MenuBar from "../MenuBar";
import OrdersModal from "../modal/OrdersModal";
import { db } from "../../firebase";
import OrdersEditDelete from "./OrdersEditDelete";

function InventoryOrders() {
  const [activeLink, setActiveLink] = useState("");
  const [orders, setOrders] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleOrdersClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
      const ordersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        deliveryDate: formatFirestoreTimestamp(doc.data().deliveryDate),
      }));
      setOrders(ordersList);
    });

    return () => unsubscribe();
  }, []);

  const sortOrdersByDate = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.deliveryDate);
      const dateB = new Date(b.deliveryDate);
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
    setOrders(sortedOrders);
    setSortAscending(!sortAscending);
  };

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      console.log("Order deleted successfully");
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <div className="header-content">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
          <div className="main-header-text">
            <p>
              {" "}
              <Link
                to="/dashboard"
                className="web-name"
                style={{ textDecoration: "none" }}
              >
                {" "}
                JOYLISA WEB
              </Link>{" "}
            </p>
            <p className="intro-text">Inventory</p>
          </div>
        </div>
      </section>

      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link
              to="/inventory"
              className="inv-list"
              style={{
                backgroundColor: activeLink === "inventory-list" ? "" : "",
                // borderRadius: "20px",
              }}
              onClick={() => handleLinkClick("inventory-list")}
            >
              {" "}
              Inventory
            </Link>
            <Link
              to="/inventory-orders"
              className="inv-order"
              style={{
                backgroundColor:
                  activeLink === "inventory-orders"
                    ? "inventory-orders"
                    : "#3a4d39",
                borderRadius: "20px",
              }}
              onClick={() => handleLinkClick("inventory-orders")}
            >
              {" "}
              Orders
            </Link>
          </nav>
        </div>
        {/* <div id="setting-cont">
          <img
            className="sort-btn"
            src="assets/images/sort-btn.svg"
            alt="settings"
            onClick={sortOrdersByDate}
          />
        </div> */}

        <div className="inv-setting-cont">
          <div style={{ display: "flex", marginLeft: "160px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <label>Add</label>
            </div>
            <OrdersModal />
          </div>
          <label htmlFor="" style={{ marginLeft: "5px" }}>
            Sort
          </label>
          <img
            src="assets/images/sort-btn.svg"
            alt="sort"
            onClick={sortOrdersByDate}
          />
        </div>
        <div id="inv-order-container" className="body-list-container">
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              id="order-list"
              style={{ cursor: "pointer" }}
              onClick={() => handleOrdersClick(order)}
            >
              <div className="order-info" id="order-info">
                <div id="order-quant">
                  <label>{order.orderCategory}</label>
                  <output>x{order.quantity}</output>
                </div>
                <span>Delivery date: {order.deliveryDate}</span>
              </div>
              <div id="order-status">
                <div id="stat-condition">
                  <output
                    style={{
                      backgroundColor:
                        order.status === "PENDING" ? "#E3B09F" : "#8ed495",
                      fontSize: "12px",
                    }}
                  >
                    {order.status}
                  </output>
                </div>
                <div id="order-amount">
                  <output
                    style={{
                      backgroundColor:
                        order.status === "PENDING" ? "#E3B09F" : "#8ed495",
                    }}
                  >
                    {order.totalAmount}
                    .00
                  </output>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <OrdersEditDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        deleteOrder={deleteOrder}
      />
      <MenuBar />
    </div>
  );
}

export default InventoryOrders;
