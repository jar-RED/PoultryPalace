import React, { useContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../login-context/AuthContext";

export function EggsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [pulletQuantity, setPulletQuantity] = useState("");
  const [smallQuantity, setSmallQuantity] = useState("");
  const [mediumQuantity, setMediumQuantity] = useState("");
  const [largeQuantity, setLargeQuantity] = useState("");
  const [extraLargeQuantity, setExtraLargeQuantity] = useState("");
  const [jumboQuantity, setJumboQuantity] = useState("");
  const [eggsAlert, setEggsAlert] = useState("");
  const [eggsDate, setEggsDate] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleEggs = async (e) => {
    e.preventDefault();
    if (
      !pulletQuantity ||
      !smallQuantity ||
      !mediumQuantity ||
      !largeQuantity ||
      !extraLargeQuantity ||
      !jumboQuantity ||
      !eggsAlert ||
      !eggsDate
    ) {
      alert("Please fill all fields.");
      return;
    }
    onClose();
    try {
      const totalEggs =
        Number(pulletQuantity) +
        Number(smallQuantity) +
        Number(mediumQuantity) +
        Number(largeQuantity) +
        Number(extraLargeQuantity) +
        Number(jumboQuantity);

      await addDoc(collection(db, "chickenEggs"), {
        userId: currentUser.uid,
        pullets: Number(pulletQuantity),
        small: Number(smallQuantity),
        medium: Number(mediumQuantity),
        large: Number(largeQuantity),
        extraLarge: Number(extraLargeQuantity),
        jumbo: Number(jumboQuantity),
        eggsAlert: Number(eggsAlert),
        eggsDate: new Date(eggsDate),
        totalEggs: totalEggs,
      });
      console.log("Chicken Eggs added successfully");
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
          <h2>Chicken Eggs</h2>
          <form action="addInvItem">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#83a18c",
                borderRadius: "15px",
                marginBottom: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <h3 style={{ textAlign: "center" }}>Eggs Input</h3>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={pulletQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setPulletQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginLeft: "15px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: pulletQuantity ? "0" : "10px",
                      left: "20px",
                      color: pulletQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: pulletQuantity ? "12px" : "15px",
                    }}
                  >
                    Pullets
                  </label>
                </div>

                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={smallQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setSmallQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginRight: "20px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: smallQuantity ? "0" : "10px",
                      left: "10px",
                      color: smallQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: smallQuantity ? "12px" : "15px",
                    }}
                  >
                    Small
                  </label>
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={mediumQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setMediumQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginLeft: "15px",
                      marginRight: "20px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: mediumQuantity ? "0" : "10px",
                      left: "20px",
                      color: mediumQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: mediumQuantity ? "12px" : "15px",
                    }}
                  >
                    Medium
                  </label>
                </div>

                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={largeQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setLargeQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginRight: "20px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: largeQuantity ? "0" : "10px",
                      left: "10px",
                      color: largeQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: largeQuantity ? "12px" : "15px",
                    }}
                  >
                    Large
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", marginBottom: "10px" }}>
                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={extraLargeQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setExtraLargeQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginLeft: "15px",
                      marginRight: "20px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: extraLargeQuantity ? "0" : "10px",
                      left: "20px",
                      color: extraLargeQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: extraLargeQuantity ? "12px" : "15px",
                    }}
                  >
                    X-Large
                  </label>
                </div>

                <div
                  style={{
                    position: "relative",
                    margin: "auto",
                    width: "auto",
                  }}
                >
                  <input
                    type="number"
                    value={jumboQuantity}
                    onChange={(e) => {
                      if (numberRegex.test(e.target.value)) {
                        setJumboQuantity(e.target.value);
                      }
                    }}
                    style={{
                      marginRight: "20px",
                      width: "17vw",
                      fontSize: "15px",
                      paddingTop: "15px",
                    }}
                  />
                  <label
                    style={{
                      position: "absolute",
                      top: jumboQuantity ? "0" : "10px",
                      left: "10px",
                      color: jumboQuantity ? "#999" : "#999",
                      transition: "0.3s ease all",
                      fontSize: jumboQuantity ? "12px" : "15px",
                    }}
                  >
                    Jumbo
                  </label>
                </div>
              </div>
            </div>

            <label htmlFor="order-amnt">
              Alert if total eggs are under: <br />
              <input
                type="number"
                style={{ width: "50vw" }}
                value={eggsAlert}
                onChange={(e) => setEggsAlert(e.target.value)}
              />
            </label>

            <label htmlFor="order-date">
              Date:
              <br />
              <input
                type="date"
                value={eggsDate}
                onChange={(e) => setEggsDate(e.target.value)}
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
            <button
              className="save-btn"
              onClick={(e) => {
                handleEggs(e);
                // aggregateEggQuantitiesInRealTime();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
