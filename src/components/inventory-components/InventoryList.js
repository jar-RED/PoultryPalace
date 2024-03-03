import React, { useState } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";

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
                backgroundColor:
                  activeLink === "inventory-list"
                    ? "inventory-list"
                    : "#3a4d39",
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
        <div id="inv-main-container">
          <div id="chicken-stock">
            <form action="">
              <h4>
                CHICKEN <br />
                STOCK
              </h4>
              <label htmlFor="chicken-stock">STOCK: </label>
              <output name="chicken-stock">00</output>
            </form>
          </div>

          <div id="chicken-feeds">
            <form action="">
              <h4>
                CHICKEN <br />
                FEEDS
              </h4>
              <label htmlFor="chicken-feeds">STOCK: </label>
              <output name="chicken-feeds">00</output>
            </form>
          </div>
        </div>

        <div id="main-container-2">
          <div id="chicken-eggs">
            <form className="egg-cont">
              <h4>CHICKEN EGGS</h4>
              <div className="form-row">
                <div className="form-column">
                  <label>PULLETS: </label>
                  <output name="pullets">00</output> <br />
                  <label>SMALL: </label>
                  <output name="small">00</output> <br />
                  <label>MEDIUM: </label>
                  <output name="medium">00</output> <br />
                </div>
                <div className="form-column">
                  <label>LARGE: </label>
                  <output name="large">00</output> <br />
                  <label>EXTRA LARGE: </label>
                  <output name="x-large">00</output> <br />
                  <label>JUMBO: </label>
                  <output name="jumbo">00</output> <br />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <label>TOTAL EGGS IN STOCK: </label>
                <output name="total">00</output> <br />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Modal />
      <MenuBar />
    </div>
  );
};

export default InventoryList;
