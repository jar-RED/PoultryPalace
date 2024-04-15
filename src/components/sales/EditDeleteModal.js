import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { ConfirmationPopup } from "./ConfirmationPopup";
import { db } from "../../firebase";

function EditDeleteModal({ isOpen, onClose, selectedSale, deleteSale }) {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCustomerNameFocused, setIsCustomerNameFocused] = useState(false);
  const [isTotalAmountFocused, setIsTotalAmountFocused] = useState(false);

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
        totalAmount: Number(totalAmount),
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
        <div onClick={onClose} className="overlay" />
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
              {/* <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              /> */}
              <div
                style={{ position: "relative", margin: "auto", width: "200px" }}
              >
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  onFocus={() => setIsCustomerNameFocused(true)}
                  onBlur={() => setIsCustomerNameFocused(false)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="customerName"
                  style={{
                    position: "absolute",
                    top: isCustomerNameFocused || customerName ? "0" : "10px",
                    left: "5px",
                    color:
                      isCustomerNameFocused || customerName ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize:
                      isCustomerNameFocused || customerName ? "12px" : "15px",
                  }}
                >
                  Customer Name
                </label>
              </div>
              {/* <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="Total Amount"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              /> */}
              <div
                style={{ position: "relative", margin: "auto", width: "200px" }}
              >
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  onFocus={() => setIsTotalAmountFocused(true)}
                  onBlur={() => setIsTotalAmountFocused(false)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="customerName"
                  style={{
                    position: "absolute",
                    top: isTotalAmountFocused || totalAmount ? "0" : "10px",
                    left: "5px",
                    color:
                      isTotalAmountFocused || totalAmount ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize:
                      isTotalAmountFocused || totalAmount ? "12px" : "15px",
                  }}
                >
                  Total Amount
                </label>
              </div>
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
                  //   borderColor: "transparent",
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
}

export default EditDeleteModal;
