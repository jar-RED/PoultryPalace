import React, { useState } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";

const InventoryList = () => {
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
                  activeLink === "inventory-orders" ? "" : "#3a4d39",
                borderRadius: "20px",
              }}
              onClick={() => handleLinkClick("inventory-orders")}
            >
              {" "}
              Orders
            </Link>
          </nav>
        </div>
        <div id="inv-main-container">
          <div id="chicken-stock">
            <h4>
              CHICKEN <br />
              STOCK
            </h4>
            <span>STOCK: </span>
          </div>
          <div id="chicken-feeds">
            <h4>
              CHICKEN <br />
              FEEDS
            </h4>
            <span>STOCK: </span>
          </div>
        </div>
        <div id="main-container-2">
          <div id="chicken-eggs">
            <h4>
              CHICKEN <br />
              EGGS
            </h4>
            <span>PULLETS: </span>
            <br />
            <span>SMALL: </span>
            <br />
            <span>MEDIUM: </span>
            <br />
            <span>LARGE: </span>
            <br />
            <span>EXTRA LARGE: </span>
            <br />
            <span>JUMBO: </span>
            <br />
          </div>
        </div>
        <div id="inv-btn-container">
          <img src="assets/Add_round_fill.png" alt="add-button" onclick="" />
        </div>
      </section>

      <MenuBar />
    </div>
  );
};

export default InventoryList;
