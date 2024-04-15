import React from "react";

function SalesDefault() {
  return (
    <div>
      <section id="sales-header" className="header-welcome">
        <div className="header-content">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
          <div className="main-header-text">
            <p className="web-name">JOYLISA WEB</p>
            <p className="intro-text">Sales</p>
          </div>
        </div>
      </section>

      <section id="sales-body" className="content-body">
        <div className="container">
          <nav>
            <a href="">Sales list</a>
            <a href="">Invoice</a>
          </nav>
        </div>
        <div id="setting-cont" />
        <div id="sales-main-container" />
        <div id="sales-btn-container">
          <img src="assets/images/Add_round_fill.png" alt="sales-add-button" />
        </div>
      </section>
    </div>
  );
}

export default SalesDefault;
