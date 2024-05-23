import React, { useContext, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

const EditEggs = ({ isOpen, onClose, selectedEggs, eggType }) => {
  if (!isOpen) return null;
  const [isEditMode, setIsEditMode] = useState(false);
  const [newValue, setNewValue] = useState(selectedEggs[eggType] || 0);
  const { showToast, showError } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (eggType) {
        await updateDoc(doc(db, "chickenEggs", selectedEggs.id), {
          [eggType]: Number(newValue),
        });
        showToast(`${eggType} eggs updated successfully`);
        onClose();
      } else {
        console.error("Invalid egg type");
        onClose();
      }
    } catch (error) {
      showError("Error updating eggs");
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
              <h3 style={{ textAlign: "center" }}>Edit Egg Item</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
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
                    top: newValue ? "0" : "10px",
                    left: "25px",
                    color: newValue ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: newValue ? "12px" : "15px",
                  }}
                >
                  Quantity
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
              <h3 style={{ textAlign: "center" }}>Edit existing egg item?</h3>
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
                Yes, Edit
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

export default EditEggs;
