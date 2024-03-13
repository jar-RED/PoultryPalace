import React, { useState } from "react";
import "./RadioButton.css";

const RadioButton = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showPopupButton, setShowPopupButton] = useState(false);

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
      <div className="eggInptBtn">
        {showPopupButton && (
          <>
            <h4>Set Eggs Input</h4>
            <div className="egg-rows">
              <div className="egg-col-1">
                <label htmlFor="">
                  Pullets:
                  <input type="number" />
                </label>
                <label htmlFor="">
                  Small:
                  <input type="number" />{" "}
                </label>
                <label htmlFor="">
                  Medium:
                  <input type="number" />{" "}
                </label>
              </div>
              <div className="egg-col-2">
                <label htmlFor="">
                  Large: <input type="number" />
                </label>{" "}
                <br />
                <label htmlFor="">
                  X-large: <input type="number" />{" "}
                </label>
                <label htmlFor="">
                  Jumbo: <input type="number" />{" "}
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
              onClick={() => setShowPopupButton(false)}
            >
              Save
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RadioButton;
