import React, { useContext, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { StocksConfirmation } from "./StocksConfirmation";
import { AuthContext } from "../login-context/AuthContext";

function EditStock({ isOpen, onClose, selectedStock, deleteStock }) {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showToast } = useContext(AuthContext);

  const [stockAlert, setStockAlert] = useState(selectedStock?.stockAlert || "");

  const [stockQuantity, setStockQuantity] = useState(
    selectedStock?.stockQuantity || ""
  );

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteStock(selectedStock.id);
    onClose();
  };

  const editStock = async () => {
    try {
      await updateDoc(doc(db, "chickenStock", selectedStock.id), {
        stockAlert: Number(stockAlert),
        stockQuantity: Number(stockQuantity),
      });
      console.log("Order edited successfully");
      showToast("Order edited successfully");
      onClose();
    } catch (error) {
      console.error("Error editing selected order: ", error);
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
              <h3 style={{ textAlign: "center" }}>Edit Stock</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="stockQuantity"
                  style={{
                    position: "absolute",
                    top: stockQuantity ? "0" : "10px",
                    left: "25px",
                    color: stockQuantity ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: stockQuantity ? "12px" : "15px",
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
                  value={stockAlert}
                  onChange={(e) => setStockAlert(e.target.value)}
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
                    top: stockAlert ? "0" : "10px",
                    left: "25px",
                    color: stockAlert ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: stockAlert ? "12px" : "15px",
                  }}
                >
                  Alert
                </label>
              </div>

              <button
                onClick={editStock}
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
        stockId={selectedStock?.id}
        deleteStock={handleDeleteConfirmation}
      />
    </>
  );
}

export default EditStock;
