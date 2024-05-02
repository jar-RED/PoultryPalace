import React, { useState, useEffect, useContext } from "react";
import "./salesModal.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

export default function SalesModal() {
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const { currentUser } = useContext(AuthContext);

  const toggleModal = () => {
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
    document.querySelector(".menu").classList.remove("menu-hidden");
    try {
      await addDoc(collection(db, "sales"), {
        userId: currentUser.uid,
        customerName,
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
          onClick={() => {
            toggleModal();
            document.querySelector(".menu").classList.add("menu-hidden");
          }}
          className="btn-modal"
          alt="add-tbn"
          style={{ height: "50px" }}
        />
      </div>

      {modal && (
        <div className="modal">
          <div
            onClick={() => {
              toggleModal();
              document.querySelector(".menu").classList.remove("menu-hidden");
            }}
            className="overlay"
          />
          <div className="modal-content" style={{ maxWidth: "250px" }}>
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
            <button
              className="close-modal"
              onClick={() => {
                toggleModal();
                document.querySelector(".menu").classList.remove("menu-hidden");
              }}
            >
              X
            </button>

            <div className="modal-btns">
              <button
                className="disc-btn"
                onClick={() => {
                  toggleModal();
                  document
                    .querySelector(".menu")
                    .classList.remove("menu-hidden");
                }}
                style={{ marginRight: "0px" }}
              >
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
