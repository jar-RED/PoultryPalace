import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { StocksConfirmation } from "./StocksConfirmation";

function EditFeeds({ isOpen, onClose, selectedFeeds, deleteFeed }) {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [feedAlert, setFeedAlert] = useState(selectedFeeds?.feedAlert || "");

  const [feedQuantity, setFeedQuantity] = useState(
    selectedFeeds?.feedQuantity || ""
  );

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteFeed(selectedFeeds.id);
    onClose();
  };

  const editFeeds = async () => {
    try {
      await updateDoc(doc(db, "chickenFeeds", selectedFeeds.id), {
        feedAlert: Number(feedAlert),
        feedQuantity: Number(feedQuantity),
      });
      console.log("Feed item edited successfully");
      onClose();
    } catch (error) {
      console.error("Error editing selected feed item: ", error);
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
              <h3 style={{ textAlign: "center" }}>Edit Feed Item</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={feedQuantity}
                  onChange={(e) => setFeedQuantity(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="feedQuantity"
                  style={{
                    position: "absolute",
                    top: feedQuantity ? "0" : "10px",
                    left: "25px",
                    color: feedQuantity ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: feedQuantity ? "12px" : "15px",
                  }}
                >
                  Quantity
                </label>
              </div>

              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={feedAlert}
                  onChange={(e) => setFeedAlert(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="customerName"
                  style={{
                    position: "absolute",
                    top: feedAlert ? "0" : "10px",
                    left: "25px",
                    color: feedAlert ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: feedAlert ? "12px" : "15px",
                  }}
                >
                  Alert
                </label>
              </div>

              <button
                onClick={editFeeds}
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
              <h3 style={{ textAlign: "center" }}>
                What would you like to do?
              </h3>
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
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
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
                  //   borderColor: "transparent",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <StocksConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        feedId={selectedFeeds?.id}
        deleteStock={handleDeleteConfirmation}
      />
    </>
  );
}

export default EditFeeds;
