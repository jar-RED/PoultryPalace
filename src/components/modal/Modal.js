import React, { useState, useEffect } from "react";
import "./Modal.css";
import RadioButton from "./RadioButton";

export default function Modal({ updateChickenStock, updateChickenFeeds }) {
  const [modal, setModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [stockInput, setStockInput] = useState(0);
  const [alertInput, setAlertInput] = useState(0);
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

  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [modal]);

  const handleStockInputChange = (e) => {
    setStockInput(e.target.value);
    validateForm();
  };

  const handleAlertInputChange = (e) => {
    setAlertInput(e.target.value);
    validateForm();
  };

  const validateForm = () => {
    if (selectedOption === "option1") {
      if (stockInput > 0) {
        setIsValid(true);
      } else if (alertInput > 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (selectedOption === "option2") {
      if (stockInput > 0) {
        setIsValid(true);
      } else if (alertInput > 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else if (selectedOption === "option3") {
      if (alertInput > 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (
      !modal &&
      typeof updateChickenStock === "function" &&
      typeof updateChickenFeeds === "function"
    ) {
      // Ensure updateChickenStock is a function before calling it
      if (selectedOption === "option1") {
        updateChickenStock(stockInput);
      } else if (selectedOption === "option2") {
        updateChickenFeeds(stockInput);
      }
    }
  }, [modal, updateChickenStock, updateChickenFeeds, stockInput]);

  const handleSave = () => {
    if (
      isValid &&
      selectedOption !== "option3" &&
      stockInput > 0 &&
      alertInput > 0
    ) {
      toggleModal();
      if (selectedOption === "option1") {
        updateChickenStock(stockInput);
        setIsValid(false);
      } else if (selectedOption === "option2") {
        updateChickenFeeds(stockInput);
        setIsValid(false);
      }
    } else if (isValid && selectedOption === "option3" && alertInput > 0) {
      toggleModal();
      setIsValid(false);
    } else {
      alert("Please fill all required fields.");
    }
  };

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
              <RadioButton onOptionChange={setSelectedOption} />
              {selectedOption !== "option3" && (
                <label className="stockInpt" htmlFor="stocks">
                  Set no. of stocks:
                  <input type="number" onChange={handleStockInputChange} />
                </label>
              )}

              <label htmlFor="alert">
                Send alarm if stock is below:
                <input type="number" onChange={handleAlertInputChange} />
              </label>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns">
              <button className="disc-btn" onClick={toggleModal}>
                Discard
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
