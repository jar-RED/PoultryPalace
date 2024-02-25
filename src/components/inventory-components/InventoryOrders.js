import React, { useState } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";

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
                backgroundColor:
                  activeLink === "inventory-list" ? "" : "#3a4d39",
                borderRadius: "20px",
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
                backgroundColor: activeLink === "inventory-orders" ? "" : "",
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
            <div id="order-info">
              <div id="order-quant">
                <h4>Chicken Feeds</h4>
                <p>x10</p>
              </div>
              <span>Delivery date: 12/31/23</span>
            </div>
            <div id="order-status">
              <div id="stat-condition">
                <p>RECEIVED</p>
              </div>
              <div id="order-amount">
                <p>500.00</p>
              </div>
            </div>
          </div>
          <div id="order-list">
            <div id="order-info">
              <div id="order-quant">
                <h4>Chicken Feeds</h4>
                <p>x17</p>
              </div>
              <span>Delivery date: 03/14/24</span>
            </div>
            <div id="order-status">
              <div id="stat-condition">
                <p>DRAFT</p>
              </div>
              <div id="order-amount">
                <p>3000.00</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="sales-btn-container">
          <img src="assets/images/Add_round_fill.png" alt="sales-add-button" />
        </div> */}
      </section>
      <MenuBar />
    </div>
  );
};

export default InventoryOrders;
