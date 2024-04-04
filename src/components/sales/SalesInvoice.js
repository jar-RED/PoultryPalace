import React, { useState, useEffect } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./salesList.css";
import InvoiceModal from "./InvoiceModal";

const SalesList = () => {
  const [activeLink, setActiveLink] = useState("");
  const [invoice, setInvoiceList] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const invoiceCollection = collection(db, "invoice");
    const unsubscribe = onSnapshot(invoiceCollection, (snapshot) => {
      const invoiceList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        dueDate: formatFirestoreTimestamp(doc.data().dueDate),
      }));
      setInvoiceList(invoiceList);
    });

    return () => unsubscribe();
  }, []);

  const sortSalesByDate = () => {
    const sortedInvoice = [...invoice].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
    setInvoiceList(sortedInvoice);
    setSortAscending(!sortAscending);
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
                  activeLink === "sales-list" ? "sales-list" : "",
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
                  activeLink === "sales-invoice" ? "sales-invoice" : "#3a4d39",
                borderRadius: "15px",
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
            <InvoiceModal />
          </div>
          <label style={{ marginLeft: "5px" }}>Sort</label>
          <img
            src="assets/images/sort-btn.svg"
            alt="sort"
            onClick={sortSalesByDate}
          />
        </div>
        <div id="inv-order-container">
          {invoice.map((invoice, index) => (
            <div
              key={invoice.id || index}
              id="sales-list"
              style={{ cursor: "pointer" }}
            >
              <div className="order-info" id="order-info">
                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "normal" }}>
                    # {invoice.invoiceNumber}
                  </label>{" "}
                  <br />
                  <label>{invoice.customerName}</label>
                </div>

                <span>Due Date: {invoice.dueDate}</span>
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
                <div className="invoice-status">
                  <div
                    id="stat-condition"
                    style={{
                      marginBottom: "10px",
                      marginTop: "0px",
                    }}
                  >
                    <output
                      style={{
                        backgroundColor:
                          invoice.status === "DRAFT" ? "#E3B09F" : "#8ed495",
                        textAlign: "right",
                        fontSize: "12px",
                      }}
                    >
                      {invoice.status}
                    </output>
                  </div>
                  <div className="sales-amount">
                    <output
                      style={{
                        backgroundColor:
                          invoice.status === "DRAFT" ? "#E3B09F" : "#8ed495",
                        padding: "5px",
                        marginTop: "0px",
                      }}
                    >
                      {invoice.totalAmount}.00
                    </output>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <MenuBar />
    </div>
  );
};

export default SalesList;