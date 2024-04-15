import React, { useState } from "react";

export function ConfirmationPopup({ isOpen, onClose, saleId, deleteSale }) {
  if (!isOpen) return null;

  const handleDeleteConfirmation = () => {
    deleteSale(saleId);
    onClose();
  };

  return (
    <div className="confirmation-popup">
      <div className="overlay" onClick={onClose} />
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
        <h3 style={{ textAlign: "center" }}>
          Are you sure you want to delete this sale?
        </h3>

        <button
          onClick={handleDeleteConfirmation}
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
          Yes, Delete
        </button>

        <button
          onClick={onClose}
          style={{
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
          Cancel
        </button>
      </div>
    </div>
  );
}
