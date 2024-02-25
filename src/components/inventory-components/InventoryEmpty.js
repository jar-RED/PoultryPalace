import React from "react";
import { Link } from "react-router-dom";

const InventoryEmpty = () => {
  return (
    <>
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

      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link to={"/inventory-list"} className="alternative">
              {" "}
              Inventory List
            </Link>
            <a href="inventory-orders-list.html">Orders</a>
          </nav>
        </div>
        <p>Empty.</p>
      </section>
    </>
  );
};

export default InventoryEmpty;
