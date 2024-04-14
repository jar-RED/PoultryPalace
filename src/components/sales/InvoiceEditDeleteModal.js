import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { InvoiceConfirmationPopup } from "./InvoiceConfirmationPopup";

const InvoiceEditDeleteModal = ({
  isOpen,
  onClose,
  selectedInvoice,
  deleteInvoice,
}) => {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerName, setCustomerName] = useState(
    selectedInvoice?.customerName || ""
  );
  const [totalAmount, setTotalAmount] = useState(
    selectedInvoice?.totalAmount || ""
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    selectedInvoice?.invoiceNumber || ""
  );

  const [invoiceStatus, setInvoiceStatus] = useState(
    selectedInvoice?.status || ""
  );

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteInvoice(selectedInvoice.id);
    onClose();
  };

  const editInvoice = async () => {
    try {
      await updateDoc(doc(db, "invoice", selectedInvoice.id), {
        customerName,
        totalAmount: Number(totalAmount),
        invoiceNumber: Number(invoiceNumber),
        status: invoiceStatus,
      });
      console.log("Invoice edited successfully");
      onClose();
    } catch (error) {
      console.error("Error editing invoice: ", error);
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
              <h3 style={{ textAlign: "center" }}>Edit Invoice Item</h3>
              <input
                type="string"
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
              <input
                type="number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="Invoice Number"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              />
              <input
                type="text"
                value={invoiceStatus}
                onChange={(e) => setInvoiceStatus(e.target.value)}
                placeholder="Status"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontSize: "15px",
                }}
              />
              <button
                onClick={editInvoice}
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
      <InvoiceConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        invoiceId={selectedInvoice?.id}
        deleteInvoice={handleDeleteConfirmation}
      />
    </>
  );
};

export default InvoiceEditDeleteModal;
