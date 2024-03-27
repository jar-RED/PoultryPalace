import React, { useState, useEffect } from "react";
import "./Modal.css";

export default function OrdersModal() {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleModal = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    const invBtnCont = document.querySelector(".inv-btn-cont");
    if (invBtnCont) {
      invBtnCont.style.display = modal ? "none" : "";
    }
  }, [modal]);

  return (
    <div>
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
            <h2>Add Orders</h2>
            <form action="addInvItem">
              <label htmlFor="">Order Category</label>
              <div className="invRadioBtn">
                <div
                  style={{
                    backgroundColor:
                      selectedOption === "option1" ? "#3a4d39" : "",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    value="option1"
                    checked={selectedOption === "option1"}
                  />
                  <label htmlFor="option1">Chicken Stock</label>
                  <br />
                </div>

                <div
                  style={{
                    backgroundColor:
                      selectedOption === "option2" ? "#3a4d39" : "",
                    borderRadius: "0",
                  }}
                >
                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    value="option2"
                    checked={selectedOption === "option2"}
                  />
                  <label htmlFor="option2">Chicken Feeds</label>
                  <br />
                </div>
              </div>

              <label htmlFor="order-quant">
                Enter no. of quantity
                <input type="number" />
              </label>

              <label htmlFor="order-amnt">
                Enter total amount
                <input type="number" />
              </label>

              <label htmlFor="order-date">
                Estimated delivery date:
                <input type="date" />
              </label>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns">
              <button className="disc-btn" onClick={toggleModal}>
                Discard
              </button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
