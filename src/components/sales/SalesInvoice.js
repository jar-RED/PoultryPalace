import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import MenuBar from "../MenuBar";
import { db } from "../../firebase";
import "./salesList.css";
import InvoiceModal from "./InvoiceModal";
import InvoiceEditDeleteModal from "./InvoiceEditDeleteModal";
import { AuthContext } from "../login-context/AuthContext";

function SalesInvoice() {
  const [activeLink, setActiveLink] = useState("");
  const [invoice, setInvoiceList] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { currentUser, showToast } = useContext(AuthContext);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }
    const invoiceCollection = collection(db, "invoice");
    const unsubscribe = onSnapshot(invoiceCollection, (snapshot) => {
      const invoiceList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dueDate: formatFirestoreTimestamp(doc.data().dueDate),
          dateOfPurchase: formatFirestoreTimestamp(doc.data().dateOfPurchase),
        }));
      setInvoiceList(invoiceList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const sortInvoiceByDate = () => {
    const sortedInvoice = [...invoice].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortAscending ? dateA - dateB : dateB - dateA;
    });
    setInvoiceList(sortedInvoice);
    setSortAscending(!sortAscending);
  };

  const deleteInvoice = async (invoiceId) => {
    try {
      await deleteDoc(doc(db, "invoice", invoiceId));
      showToast("Invoice deleted successfully", "success");
      setInvoiceList(invoice.filter((invoice) => invoice.id !== invoiceId));
    } catch (error) {
      console.error("Error deleting invoice: ", error);
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
                to="/dashboard"
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
              to="/sales-list"
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
              to="/sales-invoice"
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
          <div style={{ display: "flex", marginLeft: "160px" }}>
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
            onClick={sortInvoiceByDate}
          />
        </div>
        <div id="inv-order-container" className="body-list-container">
          {invoice.map((invoice, index) => (
            <div
              style={{
                background: "rgb(131, 161, 134)",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 4px 8px",
                color: "#e3e3ce",
                marginLeft: "20px",
                marginRight: "20px",
                borderRadius: "20px",
                marginBottom: "15px",
                cursor: "pointer",
              }}
              key={invoice.id || index}
              id="invoice-list"
              onClick={() => handleInvoiceClick(invoice)}
            >
              <div style={{ display: "flex" }}>
                <label
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  Invoice # {invoice.invoiceNumber}
                </label>
                <label
                  style={{
                    marginLeft: "auto",
                    marginRight: "20px",
                    marginTop: "10px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    fontWeight: "bold",
                    color: "black",
                    backgroundColor:
                      invoice.status === "DRAFT" ? "#E3B09F" : "#8ed495",
                    borderRadius: "20px",
                  }}
                >
                  {invoice.status}
                </label>
              </div>
              <label
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  fontSize: "15pt",
                }}
              >
                {invoice.customerName}
              </label>
              <div>
                <label
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  Date of Purchase:
                </label>
                <label style={{ marginLeft: "10px" }}>
                  {invoice.dateOfPurchase}
                </label>
              </div>
              <hr style={{ width: "75vw" }} />
              <div>
                <label
                  style={{
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                >
                  Purchase Summary:
                </label>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <table
                      style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        borderCollapse: "collapse",
                        width: "100%",
                        borderSpacing: "0",
                      }}
                    >
                      <thead>
                        <tr>
                          <th style={{ padding: "8px", textAlign: "left" }}>
                            Item
                          </th>
                          <th style={{ padding: "8px", textAlign: "center" }}>
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Pullet Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.Pullets || 0}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Small Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.Small || 0}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Medium Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.Medium || 0}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Large Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.Large || 0}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Extra large Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.ExtraLarge || 0}
                            </td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              <span style={{ marginLeft: "0px" }}>
                                Jumbo Eggs
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                textAlign: "center",
                              }}
                            >
                              {invoice.eggInfo.Jumbo || 0}
                            </td>
                          </tr>
                        </>
                      </tbody>
                    </table>
                  </div>
                  <hr style={{ width: "75vw" }} />
                </div>
              </div>
              <table
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  borderCollapse: "collapse",
                  width: "95%",
                  borderSpacing: "0",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      Total Amount
                    </th>
                    <th style={{ padding: "8px", textAlign: "center" }}>
                      <label
                        style={{
                          marginTop: "10px",
                          paddingTop: "5px",
                          paddingBottom: "5px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                          color: "black",
                          backgroundColor:
                            invoice.status === "DRAFT" ? "#E3B09F" : "#8ed495",
                          borderRadius: "20px",
                        }}
                      >
                        {invoice.totalAmount}.00
                      </label>
                    </th>
                  </tr>
                </thead>
              </table>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "10px",
                }}
              >
                <label
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Payment due date:
                </label>
                <label
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  {invoice.dueDate}
                </label>
              </div>
            </div>
          ))}
          {/* {invoice.map((invoice, index) => (
            <div
              key={invoice.id || index}
              id="sales-list"
              style={{ cursor: "pointer" }}
              onClick={() => handleInvoiceClick(invoice)}
            >
              <div className="order-info" id="order-info">
                <div style={{ marginTop: "10px" }}>
                  <label style={{ fontWeight: "normal" }}>
                    # {invoice.invoiceNumber}
                  </label>{" "}
                  <br />
                  <label>{invoice.customerName}</label>
                </div>

                <span>
                  Due Date:
                  {invoice.dueDate}
                </span>
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
                      {invoice.totalAmount}
                      .00
                    </output>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </section>
      <InvoiceEditDeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedInvoice={selectedInvoice}
        deleteInvoice={deleteInvoice}
      />
      <MenuBar />
    </div>
  );
}

export default SalesInvoice;
