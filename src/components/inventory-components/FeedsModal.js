import React, { useContext, useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../login-context/AuthContext";

export function FeedsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [feedQuantity, setFeedQuantity] = useState("");
  const [feedAlert, setFeedAlert] = useState("");
  const [feedsDate, setFeedsDate] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleFeeds = async (e) => {
    e.preventDefault();
    if (!feedQuantity || !feedAlert || !feedsDate) {
      alert("Please fill all fields.");
      return;
    }
    onClose();
    try {
      await addDoc(collection(db, "chickenFeeds"), {
        userId: currentUser.uid,
        feedQuantity: Number(feedQuantity),
        feedAlert: Number(feedAlert),
        feedsDate: new Date(feedsDate),
      });
      console.log("Feeds added successfully");
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
          <h2>Add Chicken Feeds</h2>
          <form action="addInvItem">
            <label htmlFor="order-quant" style={{ marginTop: "20px" }}>
              Enter no. of quantity <br />
              <input
                type="number"
                style={{ width: "50vw" }}
                value={feedQuantity}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value)) {
                    setFeedQuantity(e.target.value);
                  }
                }}
              />
            </label>

            <label htmlFor="order-amnt">
              Send alarm if feeds are below: <br />
              <input
                type="number"
                style={{ width: "50vw" }}
                value={feedAlert}
                onChange={(e) => {
                  if (numberRegex.test(e.target.value)) {
                    setFeedAlert(e.target.value);
                  }
                }}
              />
            </label>

            <label htmlFor="order-date">
              Date:
              <br />
              <input
                type="date"
                value={feedsDate}
                onChange={(e) => setFeedsDate(e.target.value)}
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
            <button className="save-btn" onClick={handleFeeds}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
