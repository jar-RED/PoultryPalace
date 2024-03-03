import React, { useState } from "react";
import "./Modal.css";
import RadioButton from "./RadioButton";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <div className="inv-btn-cont">
        <img
          src="assets/images/Add_round_fill.png"
          onClick={toggleModal}
          className="btn-modal"
          alt=""
        />
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Inventory Item</h2>
            <form action="addInvItem">
              <label htmlFor="">Inventory Category</label>
              <RadioButton />
              <label htmlFor="">Set no. of stocks:</label>
              <input type="number" />
              <label htmlFor="alert">Send alarm if stock is below:</label>
              <input type="number" />
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns">
              <button className="disc-btn" onClick={toggleModal}>
                Discard
              </button>
              <button className="save-btn" onClick={toggleModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
