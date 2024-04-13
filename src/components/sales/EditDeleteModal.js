import React, { useState } from "react";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const EditDeleteModal = ({ isOpen, onClose, selectedSale, deleteSale }) => {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerName, setCustomerName] = useState(
    selectedSale?.customerName || ""
  );
  const [totalAmount, setTotalAmount] = useState(
    selectedSale?.totalAmount || ""
  );

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteSale(selectedSale.id);
    onClose();
  };

  const editSale = async () => {
    try {
      await updateDoc(doc(db, "sales", selectedSale.id), {
        customerName,
        totalAmount,
      });
      console.log("Sale edited successfully");
      onClose();
    } catch (error) {
      console.error("Error editing sale: ", error);
    }
  };

  return (
    <>
      <div className="option-modal">
        <div onClick={onClose} className="overlay"></div>
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
              <h3 style={{ textAlign: "center" }}>Edit Sale Item</h3>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              />
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Total Amount"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              />
              <button
                onClick={editSale}
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
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>What would you like to do?</h3>
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
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        saleId={selectedSale?.id}
        deleteSale={handleDeleteConfirmation}
      />
    </>
  );
};

export default EditDeleteModal;
