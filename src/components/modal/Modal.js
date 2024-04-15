import React, { useState, useEffect } from "react";
import "./Modal.css";
import "./RadioButton.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Modal({
  updateChickenStock,
  updateChickenFeeds,
  updateChickenEggs,
}) {
  const [modal, setModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [stockInput, setStockInput] = useState(0);
  const [alertInput, setAlertInput] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showPopupButton, setShowPopupButton] = useState(false);
  const [eggInputs, setEggInputs] = useState({
    eggJumbo: 0,
    eggLarge: 0,
    eggMedium: 0,
    eggPullets: 0,
    eggSmall: 0,
    eggXLarge: 0,
    date: "",
  });

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

  // Eggs inputs
  const handleRadioChange = (e) => {
    const { value } = e.target;

    setSelectedOption(value);
    if (value === "option3") {
      setShowPopupButton(true);
    } else {
      setShowPopupButton(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name.startsWith("egg") ? Number(value) : value;
    setEggInputs({ ...eggInputs, [name]: numericValue });
  };

  const saveEggInputs = async () => {
    console.log("Updating egg inputs:", eggInputs);

    const eggInputsRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");

    try {
      await updateDoc(eggInputsRef, {
        eggJumbo: eggInputs.eggJumbo,
        eggLarge: eggInputs.eggLarge,
        eggMedium: eggInputs.eggMedium,
        eggPullets: eggInputs.eggPullets,
        eggSmall: eggInputs.eggSmall,
        eggXLarge: eggInputs.eggXLarge,
        date: new Date(),
      });
      console.log("Egg inputs updated successfully in Firestore");
      setShowPopupButton(false);
    } catch (error) {
      console.error("Error updating egg inputs in Firestore: ", error);
    }
    setShowPopupButton(false);
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
      typeof updateChickenFeeds === "function" &&
      typeof updateChickenEggs === "function"
    ) {
      // Ensure updateChickenStock is a function before calling it
      if (selectedOption === "option1") {
        updateChickenStock(stockInput);
      } else if (selectedOption === "option2") {
        updateChickenFeeds(stockInput);
      } else if (selectedOption === "option3") {
        updateChickenEggs(eggInputs);
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
      updateChickenEggs(eggInputs);
      setIsValid(false);
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <>
      <div className="inv-btn-cont">
        <img
          src="assets/images/add-button.svg"
          onClick={toggleModal}
          className="btn-modal"
          style={{ height: "70px" }}
        />
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay" />
          <div className="modal-content">
            <h2>Add Inventory Item</h2>
            <form action="addInvItem">
              <label htmlFor="">Inventory Category</label>
              <div>
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
                      onChange={handleRadioChange}
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
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="option2">Chicken Feeds</label>
                    <br />
                  </div>

                  <div
                    style={{
                      backgroundColor:
                        selectedOption === "option3" ? "#3a4d39" : "",
                      borderRadius: "0 0 10px 10px",
                    }}
                  >
                    <input
                      type="radio"
                      id="option3"
                      name="options"
                      value="option3"
                      checked={selectedOption === "option3"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="option3">Chicken Eggs</label>
                    <br />
                  </div>
                </div>
                <div className={`eggInptBtn ${showPopupButton ? "show" : ""}`}>
                  {showPopupButton && (
                    <>
                      <h4>Set Eggs Input</h4>
                      <div className="egg-rows">
                        <div className="egg-col-1">
                          <label htmlFor="">
                            Pullets:
                            <input
                              type="number"
                              name="eggPullets"
                              onChange={handleInputChange}
                            />
                          </label>
                          <label htmlFor="">
                            Small:
                            <input
                              type="number"
                              name="eggSmall"
                              onChange={handleInputChange}
                            />{" "}
                          </label>
                          <label htmlFor="">
                            Medium:
                            <input
                              type="number"
                              name="eggMedium"
                              onChange={handleInputChange}
                            />{" "}
                          </label>
                        </div>
                        <div className="egg-col-2">
                          <label htmlFor="">
                            Large:{" "}
                            <input
                              type="number"
                              name="eggLarge"
                              onChange={handleInputChange}
                            />
                          </label>{" "}
                          <br />
                          <label htmlFor="">
                            X-large:{" "}
                            <input
                              type="number"
                              name="eggXLarge"
                              onChange={handleInputChange}
                            />{" "}
                          </label>
                          <label htmlFor="">
                            Jumbo:{" "}
                            <input
                              type="number"
                              name="eggJumbo"
                              onChange={handleInputChange}
                            />{" "}
                          </label>
                        </div>
                      </div>
                      <div className="colDate">
                        <label htmlFor="date">
                          Date:
                          <input type="date" />
                        </label>
                      </div>

                      <button
                        className="eggs-save"
                        type="button"
                        onClick={saveEggInputs}
                      >
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>
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
