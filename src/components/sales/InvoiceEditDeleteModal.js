import React, { useContext, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";
import { InvoiceConfirmationPopup } from "./InvoiceConfirmationPopup";

function InvoiceEditDeleteModal({
  isOpen,
  onClose,
  selectedInvoice,
  deleteInvoice,
}) {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showToast } = useContext(AuthContext);
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
      showToast("Invoice edited successfully");
      onClose();
    } catch (error) {
      console.error("Error editing invoice: ", error);
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
              <h3 style={{ textAlign: "center" }}>Edit Invoice Item</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="string"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="customerName"
                  style={{
                    position: "absolute",
                    top: customerName ? "0" : "10px",
                    left: "5px",
                    color: customerName ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: customerName ? "12px" : "15px",
                  }}
                >
                  Customer Name
                </label>
              </div>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="totalAmount"
                  style={{
                    position: "absolute",
                    top: totalAmount ? "0" : "10px",
                    left: "5px",
                    color: totalAmount ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: totalAmount ? "12px" : "15px",
                  }}
                >
                  Total Amount
                </label>
              </div>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="invoiceNumber"
                  style={{
                    position: "absolute",
                    top: invoiceNumber ? "0" : "10px",
                    left: "5px",
                    color: invoiceNumber ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: invoiceNumber ? "12px" : "15px",
                  }}
                >
                  Invoice Number
                </label>
              </div>

              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <label
                  htmlFor="invoiceStatus"
                  style={{
                    display: "block",
                    marginBottom: "0px",
                    fontSize: "15px",
                    color: "#999",
                  }}
                >
                  Status
                </label>
                <select
                  id="invoiceStatus"
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "10px",
                    fontSize: "15px",
                    padding: "5px",
                    width: "120px",
                    borderRadius: "5px",
                  }}
                >
                  <option value="DRAFT" style={{ left: "15px" }}>
                    Draft
                  </option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
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
      <InvoiceConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        invoiceId={selectedInvoice?.id}
        deleteInvoice={handleDeleteConfirmation}
      />
    </>
  );
}

export default InvoiceEditDeleteModal;
