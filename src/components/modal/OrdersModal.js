import React, { useState, useEffect, useContext } from "react";
import "./Modal.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

export default function OrdersModal() {
  const [modal, setModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const { currentUser } = useContext(AuthContext);

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
      setSelectedOption("");
      setQuantity("");
      setTotalAmount("");
      setDeliveryDate("");
    }
  }, [modal]);

  const handleOrders = async (e) => {
    e.preventDefault();
    toggleModal();
    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        orderCategory: selectedOption,
        quantity: Number(quantity),
        totalAmount: Number(totalAmount),
        deliveryDate: new Date(deliveryDate),
        status: "PENDING",
      });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  return (
    <div>
      <div className="inv-btn-cont">
        <img
          src="assets/images/add-square.svg"
          onClick={toggleModal}
          className="btn-modal"
          alt="add-tbn"
          style={{ height: "50px" }}
        />
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay" />
          <div className="modal-content" style={{ maxWidth: "250px" }}>
            <h2>Add Orders</h2>
            <form action="addInvItem">
              <label htmlFor="">Order Category</label>
              <div className="invRadioBtn">
                <div
                  style={{
                    backgroundColor:
                      selectedOption === "Chicken Stock" ? "#3a4d39" : "",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    style={{ width: "auto" }}
                    value="Chicken Stock"
                    checked={selectedOption === "Chicken Stock"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <label htmlFor="option1">Chicken Stock</label>
                  <br />
                </div>

                <div
                  style={{
                    backgroundColor:
                      selectedOption === "Chicken Feeds" ? "#3a4d39" : "",
                    borderRadius: "0 0 10px 10px",
                  }}
                >
                  <input
                    type="radio"
                    style={{ width: "auto" }}
                    id="option2"
                    name="options"
                    value="Chicken Feeds"
                    checked={selectedOption === "Chicken Feeds"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <label htmlFor="option2">Chicken Feeds</label>
                  <br />
                </div>
              </div>

              <label htmlFor="order-quant" style={{ marginTop: "20px" }}>
                Enter no. of quantity
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>

              <label htmlFor="order-amnt">
                Enter total amount
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </label>

              <label htmlFor="order-date">
                Estimated delivery date:
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </label>
            </form>
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>

            <div className="modal-btns">
              <button
                className="disc-btn"
                onClick={toggleModal}
                style={{ marginRight: "0px" }}
              >
                Discard
              </button>
              <button onClick={handleOrders} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
