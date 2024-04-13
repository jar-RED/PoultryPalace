import React, { useState, useEffect } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./salesList.css";
import SalesModal from "./SalesModal";
import EditDeleteModal from "./EditDeleteModal";
import { doc, deleteDoc } from "firebase/firestore";

const SalesList = () => {
  const [activeLink, setActiveLink] = useState("");
  const [sales, setSalesList] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleSaleClick = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const salesCollection = collection(db, "sales");
    const unsubscribe = onSnapshot(salesCollection, (snapshot) => {
      const salesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dateOfPurchase: formatFirestoreTimestamp(doc.data().dateOfPurchase),
      }));
      setSalesList(salesList);
    });

    return () => unsubscribe();
  }, []);

  const sortSalesByDate = () => {
    const sortedSales = [...sales].sort((a, b) => {
      const dateA = new Date(a.dateOfPurchase);
      const dateB = new Date(b.dateOfPurchase);
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
    setSalesList(sortedSales);
    setSortAscending(!sortAscending);
  };

  const deleteSale = async (saleId) => {
    try {
      await deleteDoc(doc(db, "sales", saleId));
      console.log("Sale deleted successfully");
      setSalesList(sales.filter((sale) => sale.id !== saleId));
    } catch (error) {
      console.error("Error deleting sale: ", error);
    }
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
            <p className="intro-text">Sales</p>
          </div>
        </div>
      </section>

      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link
              to={"/sales-list"}
              className="sales-list"
              style={{
                backgroundColor:
                  activeLink === "sales-list" ? "sales-list" : "#3a4d39",
                borderRadius: "15px",
              }}
              onClick={() => handleLinkClick("inventory-list")}
            >
              {" "}
              Sales List
            </Link>
            <Link
              to={"/sales-invoice"}
              className="sales-invoice"
              style={{
                backgroundColor:
                  activeLink === "sales-invoice" ? "sales-invoice" : "",
              }}
              onClick={() => handleLinkClick("inventory-orders")}
            >
              {" "}
              Invoice
            </Link>
          </nav>
        </div>
        <div className="add-sales-cont">
          <div style={{ display: "flex", marginLeft: "220px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <label>Add</label>
            </div>
            <SalesModal />
          </div>
          <label style={{ marginLeft: "5px" }}>Sort</label>
          <img
            src="assets/images/sort-btn.svg"
            alt="sort"
            onClick={sortSalesByDate}
          />
        </div>

        <div id="inv-order-container">
          {sales.map((sale, index) => (
            <div
              key={sale.id || index}
              id="sales-list"
              style={{ cursor: "pointer" }}
              onClick={() => handleSaleClick(sale)}
            >
              <div className="order-info" id="order-info">
                <div id="order-quant">
                  <label>{sale.customerName}</label>
                </div>
                <span>Purchase Date: {sale.dateOfPurchase}</span>
              </div>
              <div
                id="sales-status"
                className="sales-status"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="sales-amount">
                  <output
                    style={{
                      backgroundColor: "#8ed495",
                      padding: "5px",
                      marginTop: "0px",
                    }}
                  >
                    {sale.totalAmount}.00
                  </output>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <EditDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedSale={selectedSale}
        deleteSale={deleteSale}
      />
      <MenuBar />
    </div>
  );
};

export default SalesList;
