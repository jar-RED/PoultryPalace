import React, { useState, useEffect, useContext } from "react";
import "./salesModal.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

export default function InvoiceModal() {
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { currentUser } = useContext(AuthContext);

  const toggleModal = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    const invBtnCont = document.querySelector(".inv-btn-cont");
    if (invBtnCont) {
      invBtnCont.style.display = modal ? "none" : "";
    }
  }, [modal]);

  useEffect(() => {
    if (modal) {
      setCustomerName("");
      setInvoiceNumber("");
      setTotalAmount("");
      setDueDate("");
    }
  }, [modal]);

  const handleInvoice = async (e) => {
    e.preventDefault();
    if (!customerName || !totalAmount || !dueDate || !invoiceNumber) {
      window.alert("Please fill in all fields.");
      return;
    }
    toggleModal();
    try {
      await addDoc(collection(db, "invoice"), {
        userId: currentUser.uid,
        customerName,
        invoiceNumber: Number(invoiceNumber),
        totalAmount: Number(totalAmount),
        dueDate: new Date(dueDate),
        status: "DRAFT",
      });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div>
      <div className="inv-btn-cont">
        <img
          src="assets/images/add-square.svg"
          onClick={toggleModal}
          className="btn-modal"
          alt="add-tbn"
          style={{ height: "50px" }}
        />
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay" />
          <div className="modal-content" style={{ maxWidth: "250px" }}>
            <h2>Create Invoice</h2>
            <form action="addInvItem">
              <label htmlFor="customer-name" style={{ marginTop: "20px" }}>
                Customer Name
                <input
                  type="string"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: "50vw" }}
                />
              </label>

              <label htmlFor="invoice">
                Invoice Number
                <input
                  type="number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  style={{ width: "50vw" }}
                />
              </label>

              <label htmlFor="order-amnt">
                Total amount
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  style={{ width: "50vw" }}
                />
              </label>

              <label htmlFor="order-date">
                Due date of payment
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </label>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns" style={{ display: "flex" }}>
              <button
                className="disc-btn"
                onClick={toggleModal}
                style={{ marginRight: "0px" }}
              >
                Discard
              </button>
              <button onClick={handleInvoice} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
