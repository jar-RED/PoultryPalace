import React from 'react'

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
          <a href="inventory-list.html">Inventory List</a>
          <a href="inventory-orders-list.html">Orders</a>
        </nav>
      </div>
      <p>Empty.</p>
      <div id="main-container-2"></div>
      <div id="inv-btn-container">
        <img src="assets/images/Add_round_fill.png" alt="inv-add-button" />
      </div>
    </section>
    </>
  )
}

export default InventoryEmpty
