import React, { useState } from "react";
import "./RadioButton.css";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const RadioButton = ({ onOptionChange }) => {
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

  const handleRadioChange = (event) => {
    const value = event.target.value;
    onOptionChange(value);

    setSelectedOption(value);
    if (value === "option3") {
      setShowPopupButton(true);
    } else {
      setShowPopupButton(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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

  return (
    <>
      <div className="invRadioBtn">
        <div
          style={{
            backgroundColor: selectedOption === "option1" ? "#3a4d39" : "",
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
            backgroundColor: selectedOption === "option2" ? "#3a4d39" : "",
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
            backgroundColor: selectedOption === "option3" ? "#3a4d39" : "",
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

            <button className="eggs-save" type="button" onClick={saveEggInputs}>
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RadioButton;
