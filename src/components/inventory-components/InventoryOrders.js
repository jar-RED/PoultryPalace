import React, { useState } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import OrdersModal from "../modal/OrdersModal";

const InventoryOrders = () => {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
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
                to={"/dashboard"}
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
              to={"/inventory-list"}
              className="inv-list"
              style={{
                backgroundColor: activeLink === "inventory-list" ? "" : "",
                // borderRadius: "20px",
              }}
              onClick={() => handleLinkClick("inventory-list")}
            >
              {" "}
              Inventory List
            </Link>
            <Link
              to={"/inventory-orders"}
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
        <div id="setting-cont">
          <img
            className="settings-btn"
            src="assets/images/settings.png"
            alt="settings"
          />
        </div>
        <div id="inv-order-container">
          <div id="order-list">
            <div className="order-info" id="order-info">
              <div id="order-quant">
                <label>Chicken Feeds</label>
                <output>x10</output>
              </div>
              <span>Delivery date: 12/31/23</span>
            </div>
            <div id="order-status">
              <div id="stat-condition">
                <output>RECEIVED</output>
              </div>
              <div id="order-amount">
                <output>500.00</output>
              </div>
            </div>
          </div>
          <div id="order-list">
            <div className="order-info" id="order-info">
              <div id="order-quant">
                <label>Chicken Stock</label>
                <output name="chicken-stock">x100</output>
              </div>
              <span>Delivery date: 03/14/24</span>
            </div>
            <div id="order-status">
              <div id="stat-condition">
                <output>DRAFT</output>
              </div>
              <div id="order-amount">
                <output>3000.00</output>
              </div>
            </div>
          </div>
        </div>
        <OrdersModal />
      </section>
      <MenuBar />
    </div>
  );
};

export default InventoryOrders;
