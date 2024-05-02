import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../login-context/AuthContext";

export function StockModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [stockQuantity, setStockQuantity] = useState("");
  const [stockAlert, setStockAlert] = useState("");
  const [stockDate, setStockDate] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleStock = async (e) => {
    e.preventDefault();
    if (!stockQuantity || !stockAlert || !stockDate) {
      alert("Please fill all fields.");
      return;
    }
    onClose();
    try {
      await addDoc(collection(db, "chickenStock"), {
        userId: currentUser.uid,
        stockQuantity: Number(stockQuantity),
        stockAlert: Number(stockAlert),
        stockDate: new Date(stockDate),
      });
      console.log("Stock added successfully");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const numberRegex = /^[0-9]{0,4}$/;

  return (
    <div>
      <div className="modal">
        <div onClick={onClose} className="overlay" />
        <div className="modal-content" style={{ maxWidth: "250px" }}>
          <h2>Add Chicken Stock</h2>
          <form action="addInvItem">
            <label htmlFor="order-quant" style={{ marginTop: "20px" }}>
              Enter no. of quantity <br />
              <input
                type="number"
                style={{ width: "50vw" }}
                value={stockQuantity}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value)) {
                    setStockQuantity(e.target.value);
                  }
                }}
              />
            </label>

            <label htmlFor="order-amnt">
              Send alarm if stock is below: <br />
              <input
                type="number"
                style={{ width: "50vw" }}
                value={stockAlert}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value)) {
                    setStockAlert(e.target.value);
                  }
                }}
              />
            </label>

            <label htmlFor="order-date">
              Date:
              <br />
              <input
                type="date"
                value={stockDate}
                onChange={(e) => setStockDate(e.target.value)}
              />
            </label>
          </form>
          <button className="close-modal" onClick={onClose}>
            X
          </button>

          <div className="modal-btns">
            <button
              className="disc-btn"
              onClick={onClose}
              style={{ marginRight: "0px" }}
            >
              Discard
            </button>
            <button className="save-btn" onClick={handleStock}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
