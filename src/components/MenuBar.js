import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const history = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);

  const handleInventoryClick = () => {
    setBtnClicked(true);
    history("/inventory");
  };

  const handleSalesClick = () => {
    setBtnClicked(true);
    history("/sales");
  };

  const handleNotificationsClick = () => {
    setBtnClicked(true);
    console.log("Notifications clicked");
    alert("Notifications clicked");
  };

  const handleReportsClick = () => {
    setBtnClicked(true);
    console.log("Reports clicked");
    alert("Reports clicked");
  };

  return (
    <section id="dashboard-footer" className="main-footer">
      <div className="menu">
        <div className="menu-items">
          <figure
            style={{
              cursor: "pointer",
              // backgroundColor: btnClicked ? "blue" : "black",
            }}
            onClick={handleInventoryClick}
          >
            <img src="assets/images/Desk_fill.png" alt="inventory-management" />
            <figcaption>Inventory</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              // backgroundColor: btnClicked ? "red" : "black",
            }}
            onClick={handleSalesClick}
          >
            <img
              src="assets/images/Wallet_alt_fill.png"
              alt="sales-management"
            />
            <figcaption>Sales</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              // backgroundColor: btnClicked ? "yellow" : "black",
            }}
            onClick={handleNotificationsClick}
          >
            <img src="assets/images/Bell_pin_fill.png" alt="notifications" />
            <figcaption>Notifications</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              // backgroundColor: btnClicked ? "pink" : "black",
            }}
            onClick={handleReportsClick}
          >
            <img src="assets/images/Pipe_fill.png" alt="reports" />
            <figcaption>Reports</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default MenuBar;
