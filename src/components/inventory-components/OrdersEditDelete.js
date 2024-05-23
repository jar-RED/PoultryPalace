import React, { useContext, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { OrdersConfirmation } from "./OrdersConfirmation";
import { AuthContext } from "../login-context/AuthContext";

function OrdersEditDelete({ isOpen, onClose, selectedOrder, deleteOrder }) {
  if (!isOpen) return null;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { showToast } = useContext(AuthContext);

  const [totalAmount, setTotalAmount] = useState(
    selectedOrder?.totalAmount || ""
  );

  const [orderQuantity, setOrderQuantity] = useState(
    selectedOrder?.quantity || ""
  );

  const [orderStatus, setOrderStatus] = useState(selectedOrder?.status || "");

  const handleDeleteClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteOrder(selectedOrder.id);
    onClose();
  };

  const editOrder = async () => {
    try {
      await updateDoc(doc(db, "orders", selectedOrder.id), {
        totalAmount: Number(totalAmount),
        quantity: Number(orderQuantity),
        status: orderStatus,
      });
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
              <h3 style={{ textAlign: "center" }}>Edit Order</h3>
              <div
                style={{ position: "relative", margin: "auto", width: "auto" }}
              >
                <input
                  type="number"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(e.target.value)}
                  style={{
                    marginLeft: "20px",
                    marginRight: "20px",
                    width: "50vw",
                    fontSize: "15px",
                    paddingTop: "15px",
                  }}
                />
                <label
                  htmlFor="orderQuantity"
                  style={{
                    position: "absolute",
                    top: orderQuantity ? "0" : "10px",
                    left: "25px",
                    color: orderQuantity ? "#999" : "#999",
                    transition: "0.3s ease all",
                    fontSize: orderQuantity ? "12px" : "15px",
                  }}
                >
                  Number of Orders
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
                    top: totalAmount ? "0" : "10px",
                    left: "25px",
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
                <label
                  htmlFor="orderStatus"
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
                  id="orderStatus"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
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
                  <option value="PENDING" style={{ left: "15px" }}>
                    Pending
                  </option>
                  <option value="RECEIVED">Received</option>
                </select>
              </div>

              <button
                onClick={editOrder}
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
      <OrdersConfirmation
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        orderId={selectedOrder?.id}
        deleteOrder={handleDeleteConfirmation}
      />
    </>
  );
}

export default OrdersEditDelete;
