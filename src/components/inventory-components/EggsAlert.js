import React, { useState, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../login-context/AuthContext";
import { db } from "../../firebase";

const EggsAlert = ({ isOpen, onClose, onEggsAlertChange }) => {
  if (!isOpen) return null;
  const [isEditMode, setIsEditMode] = useState(false);
  const [alert, setAlert] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlert = Number(alert);
    const docPath = doc(db, "overallEggs", `${currentUser.uid}_eggsAlert`);

    try {
      await setDoc(docPath, { alertValue: newAlert }, { merge: true });
      console.log("Alert value updated successfully!");
      onEggsAlertChange(newAlert);
      onClose();
    } catch (error) {
      console.error("Error updating alert value: ", error);
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
              <h3 style={{ textAlign: "center" }}>Set Alert Threshold</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={alert}
                  onChange={(e) => setAlert(e.target.value)}
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
                    top: alert ? "0" : "10px",
                    left: "25px",
                    color: alert ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: alert ? "12px" : "15px",
                  }}
                >
                  Alert Value
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
              <h3 style={{ textAlign: "center" }}>Set Alert for Eggs?</h3>
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

export default EggsAlert;
