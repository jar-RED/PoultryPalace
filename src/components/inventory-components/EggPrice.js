import React, { useState, useContext } from "react";
import { doc, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

const EggPrice = ({ isOpen, onClose, selectedEggs, eggType }) => {
  if (!isOpen) return null;
  const [isEditMode, setIsEditMode] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [pricePerPiece, setPricePerPiece] = useState(
    selectedEggs[eggType] || undefined
  );
  const [pricePerTray, setPricePerTray] = useState(
    selectedEggs[eggType] || undefined
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let eggPrices = {};
    try {
      if (eggType && pricePerPiece !== "" && pricePerTray !== "") {
        const allEggPrices = {
          ...eggPrices,
          [eggType]: {
            pricePerPiece: Number(pricePerPiece),
            pricePerTray: Number(pricePerTray),
          },
        };
        const docPath = doc(db, "overallEggs", `${currentUser.uid}_eggPrices`);
        await setDoc(docPath, allEggPrices, { merge: true });

        await updateDoc(docPath, {
          [eggType]: {
            pricePerPiece: Number(pricePerPiece),
            pricePerTray: Number(pricePerTray),
          },
        });

        console.log(`${eggType} price set successfully`);
        onClose();
      } else {
        console.error("Invalid price");
        onClose();
      }
    } catch (error) {
      console.error("Error updating eggs: ", error);
      onClose();
    }
  };
  return (
    <>
      <div onClick={onClose} className="overlay" />
      <div
        className="option-modal"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="modal-content"
          style={{
            background: "white",
            color: "black",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {isEditMode ? (
            <>
              <h3 style={{ textAlign: "center" }}>Set Egg Price</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={pricePerPiece}
                  onChange={(e) => setPricePerPiece(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  style={{
                    position: "absolute",
                    top: pricePerPiece ? "0" : "10px",
                    left: "25px",
                    color: pricePerPiece ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: pricePerPiece ? "12px" : "15px",
                  }}
                >
                  Price per Piece
                </label>
              </div>

              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={pricePerTray}
                  onChange={(e) => setPricePerTray(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  style={{
                    position: "absolute",
                    top: pricePerTray ? "0" : "10px",
                    left: "25px",
                    color: pricePerTray ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: pricePerTray ? "12px" : "15px",
                  }}
                >
                  Price per Tray
                </label>
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#8ed495",
                  borderRadius: "15px",
                  marginBottom: "10px",
                  fontSize: "15px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "black",
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditMode(false)}
                style={{
                  backgroundColor: "rgba(255, 46, 46, 0.767)",
                  borderRadius: "15px",
                  marginBottom: "10px",
                  fontSize: "15px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "black",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 style={{ textAlign: "center" }}>Set price for egg item?</h3>
              <button
                onClick={() => setIsEditMode(true)}
                style={{
                  backgroundColor: "#8ed495",
                  borderRadius: "15px",
                  marginBottom: "10px",
                  fontSize: "15px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "black",
                  //   borderColor: "transparent",
                }}
              >
                Yes
              </button>
              <button
                onClick={onClose}
                style={{
                  backgroundColor: "rgba(255, 46, 46, 0.767)",
                  borderRadius: "15px",
                  marginBottom: "10px",
                  fontSize: "15px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "black",
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EggPrice;
