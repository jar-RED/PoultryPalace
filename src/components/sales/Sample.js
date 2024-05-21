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

function Sample() {
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
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
            // onClick={sortInvoiceByDate}
          />
        </div>
        <div id="inv-order-container" className="body-list-container">
          <div
            style={{
              background: "lightblue",
              marginLeft: "20px",
              marginRight: "20px",
              borderRadius: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              <label
                style={{
                  marginLeft: "20px",
                  marginTop: "10px",
                }}
              >
                Invoice # 1
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
                  backgroundColor: "red",
                  borderRadius: "20px",
                }}
              >
                DRAFT
              </label>
            </div>
            <label
              style={{
                marginLeft: "20px",
                marginTop: "10px",
              }}
            >
              Customer Name
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
              <label style={{ marginLeft: "10px" }}>x/xx/xxxx</label>
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
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>Jumbo Eggs</span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          10
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>
                            Extra Large Eggs
                          </span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          15
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>Large Eggs</span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          20
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>Medium Eggs</span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          25
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>Small Eggs</span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          30
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "8px", textAlign: "left" }}>
                          <span style={{ marginLeft: "0px" }}>Pullets</span>
                        </td>
                        <td style={{ padding: "8px", textAlign: "center" }}>
                          35
                        </td>
                      </tr>
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
                        backgroundColor: "red",
                        borderRadius: "20px",
                      }}
                    >
                      xxxxx.00
                    </label>
                  </th>
                </tr>
              </thead>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label
                style={{
                  marginLeft: "20px",
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
                x/xx/xxxx
              </label>
            </div>
          </div>
        </div>
      </section>
      {/* <InvoiceEditDeleteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedInvoice={selectedInvoice}
        deleteInvoice={deleteInvoice}
      /> */}
      <MenuBar />
    </div>
  );
}

export default Sample;
