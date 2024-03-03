import React, { useState } from "react";
import "./RadioButton.css";

const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showPopupButton, setShowPopupButton] = useState(false);

  const handleRadioChange = (event) => {
    const value = event.target.value;

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
                <label htmlFor="">Pullets:</label>
                <input type="number" /> <br />
                <label htmlFor="">Small:</label>
                <input type="number" /> <br />
                <label htmlFor="">Medium:</label>
                <input type="number" /> <br />
              </div>
              <div className="egg-col-2">
                <label htmlFor="">Large:</label>
                <input type="number" /> <br />
                <label htmlFor="">X-large:</label>
                <input type="number" /> <br />
                <label htmlFor="">Jumbo:</label>
                <input type="number" /> <br />
              </div>
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
