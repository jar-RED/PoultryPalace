import React, { useState } from "react";

function LogoutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  const handleCancelLogout = () => {
    onClose();
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
            background: "rgb(231 77 77)",
            color: "black",
            borderRadius: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <>
            <h3 style={{ textAlign: "center" }}>Would you like to logout?</h3>
            <button
              onClick={handleLogout}
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
              Yes, Logout
            </button>
            <button
              onClick={handleCancelLogout}
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
              Cancel
            </button>
          </>
        </div>
      </div>
    </>
  );
}

export default LogoutModal;
