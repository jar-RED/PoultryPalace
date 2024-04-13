import React from "react";

const SalesDefault = () => {
  return (
    <div>
      <section id="sales-header" class="header-welcome">
        <div class="header-content">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
          <div class="main-header-text">
            <p class="web-name">JOYLISA WEB</p>
            <p class="intro-text">Sales</p>
          </div>
        </div>
      </section>

      <section id="sales-body" class="content-body">
        <div class="container">
          <nav>
            <a href="">Sales list</a>
            <a href="">Invoice</a>
          </nav>
        </div>
        <div id="setting-cont"></div>
        <div id="sales-main-container"></div>
        <div id="sales-btn-container">
          <img src="assets/images/Add_round_fill.png" alt="sales-add-button" />
        </div>
      </section>
    </div>
  );
};

export default SalesDefault;
