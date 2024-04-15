import React from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";

function InventoryEmpty() {
  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <header>
          <div className="header-content">
            <img src="assets/images/farm-logo.png" alt="farm-logo" />
            <div className="main-header-text">
              <p className="web-name">JOYLISA WEB</p>
              <p className="intro-text">Inventory</p>
            </div>
          </div>
        </header>
      </section>

      <div className="sectionContainer">
        <section id="inventory-body" className="content-body">
          <div className="container">
            <nav>
              <Link
                to="/inventory-list"
                className="inv-list"
                style={{ backgroundColor: "#3a4d39", borderRadius: "20px" }}
              >
                {" "}
                Inventory List
              </Link>
              <Link to="/inventory-orders" className="inv-orders">
                {" "}
                Orders
              </Link>
            </nav>
          </div>
          <div />
          <p>Empty.</p>
        </section>

        <Modal />
      </div>
    </div>
  );
}

export default InventoryEmpty;
