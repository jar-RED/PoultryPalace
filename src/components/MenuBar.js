import React, { useState, useEffect, useRef } from "react";
import { act } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./modal/LogoutModal";

function MenuBar() {
  const history = useNavigate();
  const [activeItem, setActiveItem] = useState({
    inventory: false,
    sales: false,
    notifications: false,
    reports: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveItem({
        inventory: false,
        sales: false,
        notifications: false,
        reports: false,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInventoryClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: true,
      sales: false,
      notifications: false,
      reports: false,
    });
    history("/inventory");
  };

  const handleSalesClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: false,
      sales: true,
      notifications: false,
      reports: false,
    });
    history("/sales-list");
  };

  const handleNotificationsClick = (event) => {
    event.stopPropagation();
    setActiveItem({
      inventory: false,
      sales: false,
      notifications: true,
      reports: false,
    });
    history("/notification");
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
    history("/reports");
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  return (
    <section id="dashboard-footer" className="main-footer" ref={menuRef}>
      <div className="menu">
        <div className="menu-items">
          <figure
            style={{
              cursor: "pointer",
            }}
            onClick={handleInventoryClick}
          >
            <img
              src="assets/images/inventory-icon.svg"
              alt="inventory-management"
            />
            <figcaption>Inventory</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
            }}
            onClick={handleSalesClick}
          >
            <img src="assets/images/sales-icon.svg" alt="sales-management" />
            <figcaption>Sales</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
              backgroundColor: activeItem.notifications ? "#708e76" : "",
            }}
            onClick={handleNotificationsClick}
          >
            <img
              src="assets/images/notification-icon.svg"
              alt="notifications"
            />
            <figcaption>Notifications</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
            }}
            onClick={handleReportsClick}
          >
            <img src="assets/images/reports-icon.svg" alt="reports" />
            <figcaption>Reports</figcaption>
          </figure>
          <figure
            style={{
              cursor: "pointer",
            }}
            onClick={handleLogoutClick}
          >
            <img src="assets/images/logout-icon.svg" alt="reports" />
            <figcaption>Logout</figcaption>
          </figure>
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
      />
    </section>
  );
}

export default MenuBar;
