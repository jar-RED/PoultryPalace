import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const history = useNavigate();
  const [activeItem, setActiveItem] = useState({
    inventory: false,
    sales: false,
    notifications: false,
    reports: false,
  });
  const menuRef = useRef(null); // Ref for the menu bar

  // Function to handle clicks outside the menu bar
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      // Reset the active state if the click is outside the menu bar
      setActiveItem({
        inventory: false,
        sales: false,
        notifications: false,
        reports: false,
      });
    }
  };

  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInventoryClick = (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up
    setActiveItem({
      inventory: true,
      sales: false,
      notifications: false,
      reports: false,
    });
    history("/inventory-list");
  };

  const handleSalesClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: false,
      sales: true,
      notifications: false,
      reports: false,
    });
    history("/sales");
  };

  const handleNotificationsClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: false,
      sales: false,
      notifications: true,
      reports: false,
    });
    console.log("Notifications clicked");
    alert("Notifications clicked");
  };

  const handleReportsClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: false,
      sales: false,
      notifications: false,
      reports: true,
    });
    console.log("Reports clicked");
    alert("Reports clicked");
  };

  return (
    <section id="dashboard-footer" className="main-footer" ref={menuRef}>
      <div className="menu">
        <div className="menu-items">
          <figure
            style={{
              cursor: "pointer",
              backgroundColor: activeItem.inventory ? "#708e76" : "",
            }}
            onClick={handleInventoryClick}
          >
            <img src="assets/images/Desk_fill.png" alt="inventory-management" />
            <figcaption>Inventory</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              backgroundColor: activeItem.sales ? "#708e76" : "",
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
              backgroundColor: activeItem.notifications ? "#708e76" : "",
            }}
            onClick={handleNotificationsClick}
          >
            <img src="assets/images/Bell_pin_fill.png" alt="notifications" />
            <figcaption>Notifications</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              backgroundColor: activeItem.reports ? "#708e76" : "",
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
