import React, { useState, useEffect, useContext } from "react";
import "./salesModal.css";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

export default function SalesModal() {
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [eggSizeQuantities, setEggSizeQuantities] = useState({
    Pullets: 0,
    Small: 0,
    Medium: 0,
    Large: 0,
    ExtraLarge: 0,
    Jumbo: 0,
  });
  const { currentUser, showToast } = useContext(AuthContext);
  const [totalEggs, setTotalEggs] = useState([]);

  const toggleModal = () => {
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
      setCustomerName("");
      setTotalAmount("");
      setPurchaseDate("");
      setEggSizeQuantities({
        Pullets: "",
        Small: "",
        Medium: "",
        Large: "",
        ExtraLarge: "",
        Jumbo: "",
      });
    }
  }, [modal]);

  useEffect(() => {
    const docPath = doc(
      db,
      "overallEggs",
      `${currentUser.uid}_overallChickenEggs`
    );
    const unsubscribe = onSnapshot(docPath, (docSnap) => {
      if (docSnap.exists()) {
        setTotalEggs(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleSales = async (e) => {
    e.preventDefault();

    if (!customerName || !purchaseDate || !totalAmount) {
      window.alert("Please fill in all fields.");
      return;
    }

    let isValid = true;

    if (eggSizeQuantities.Pullets > totalEggs.totalPullets) {
      window.alert(`Entered quantity for Pullets exceeds available stock.`);
      isValid = false;
    } else if (eggSizeQuantities.Small > totalEggs.totalSmall) {
      window.alert(`Entered quantity for Small exceeds available stock.`);
      isValid = false;
    } else if (eggSizeQuantities.Medium > totalEggs.totalMedium) {
      window.alert(`Entered quantity for Medium exceeds available stock.`);
      isValid = false;
    } else if (eggSizeQuantities.Large > totalEggs.totalLarge) {
      window.alert(`Entered quantity for Large exceeds available stock.`);
      isValid = false;
    } else if (eggSizeQuantities.ExtraLarge > totalEggs.totalExtraLarge) {
      window.alert(`Entered quantity for Extra Large exceeds available stock.`);
      isValid = false;
    } else if (eggSizeQuantities.Jumbo > totalEggs.totalJumbo) {
      window.alert(`Entered quantity for Jumbo exceeds available stock.`);
      isValid = false;
    } else {
      isValid = true;
    }

    const totalEggsSold = Object.values(eggSizeQuantities).reduce(
      (sum, current) => sum + current,
      0
    );

    if (!isValid) {
      return;
    }

    toggleModal();
    document.querySelector(".menu").classList.remove("menu-hidden");

    try {
      const validatedQuantities = JSON.parse(JSON.stringify(eggSizeQuantities));
      await addDoc(collection(db, "sales"), {
        userId: currentUser.uid,
        customerName,
        totalAmount: Number(totalAmount),
        dateOfPurchase: new Date(purchaseDate),
        eggSizeQuantities: validatedQuantities,
        totalEggsSold,
      });

      showToast("Sales added successfully!");
    } catch (err) {
      console.error("Error recording sale: ", err);
    }
  };

  const handleEggSizeQuantityChange = (eggSize, value) => {
    setEggSizeQuantities((prevState) => ({
      ...prevState,
      [eggSize]: Number(value),
    }));
  };

  return (
    <div>
      <div className="inv-btn-cont">
        <img
          src="assets/images/add-square.svg"
          onClick={() => {
            toggleModal();
            document.querySelector(".menu").classList.add("menu-hidden");
          }}
          className="btn-modal"
          alt="add-tbn"
          style={{ height: "50px" }}
        />
      </div>

      {modal && (
        <div
          className="modal"
          style={{
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          <div
            onClick={() => {
              toggleModal();
              document.querySelector(".menu").classList.remove("menu-hidden");
            }}
            className="overlay"
          />
          <div className="modal-content" style={{ maxWidth: "250px" }}>
            <h2>Add Sales</h2>
            <form action="addInvItem">
              <label htmlFor="order-quant" style={{ marginTop: "20px" }}>
                Customer Name
                <input
                  type="string"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>

              <div
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  background: "#83a18c",
                  borderRadius: "15px",
                  marginLeft: "10px",
                  marginRight: "10px",
                  width: "auto",
                  marginBottom: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
                }}
              >
                <table
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <thead>
                    <tr>
                      <th></th>
                      <th>Pieces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(eggSizeQuantities).map(
                      ([eggSize, quantity], index) => (
                        <tr key={index}>
                          <td>{eggSize}</td>
                          <td>
                            <input
                              style={{
                                width: "15vw",
                                height: "1vh",
                                margin: "0px",
                                marginLeft: "10px",
                              }}
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                handleEggSizeQuantityChange(
                                  eggSize,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              <label htmlFor="order-amnt">
                Total amount
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </label>

              <label htmlFor="order-date">
                Date of Purchase
                <input
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </label>
            </form>
            <button
              className="close-modal"
              onClick={() => {
                toggleModal();
                document.querySelector(".menu").classList.remove("menu-hidden");
              }}
            >
              X
            </button>

            <div className="modal-btns">
              <button
                className="disc-btn"
                onClick={() => {
                  toggleModal();
                  document
                    .querySelector(".menu")
                    .classList.remove("menu-hidden");
                }}
                style={{ marginRight: "0px" }}
              >
                Discard
              </button>
              <button onClick={handleSales} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
