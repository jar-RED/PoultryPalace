import React, { useState, useEffect } from "react";
import "./salesModal.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

export default function SalesModal() {
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

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
      setTotalAmount("");
      setPurchaseDate("");
    }
  }, [modal]);

  const handleSales = async (e) => {
    e.preventDefault();
    if (!customerName || !totalAmount || !purchaseDate) {
      window.alert("Please fill in all fields.");
      return;
    }
    toggleModal();
    try {
      await addDoc(collection(db, "sales"), {
        customerName: customerName,
        totalAmount: Number(totalAmount),
        dateOfPurchase: new Date(purchaseDate),
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
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Sales</h2>
            <form action="addInvItem">
              <label htmlFor="order-quant" style={{ marginTop: "20px" }}>
                Customer Name
                <input
                  type="string"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>

              <label htmlFor="order-amnt">
                Total amount
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </label>

              <label htmlFor="order-date">
                Date of Purchase
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </label>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns">
              <button className="disc-btn" onClick={toggleModal}>
                Discard
              </button>
              <button onClick={handleSales} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
