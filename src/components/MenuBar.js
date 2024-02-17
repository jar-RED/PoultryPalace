import React from 'react'

const MenuBar = () => {
  return (
    <section id="dashboard-footer" className="main-footer">
      <div className="menu">
        <div className="menu-items">
          <figure>
            <img src="assets/images/Desk_fill.png" alt="inventory-management" />
            <figcaption>Inventory</figcaption>
          </figure>
          <figure>
            <img src="assets/images/Wallet_alt_fill.png" alt="sales-management" />
            <figcaption>Sales</figcaption>
          </figure>
          <figure>
            <img src="assets/images/Bell_pin_fill.png" alt="notifications" />
            <figcaption>Notifications</figcaption>
          </figure>
          <figure>
            <img src="assets/images/Pipe_fill.png" alt="reports" />
            <figcaption>Reports</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default MenuBar
