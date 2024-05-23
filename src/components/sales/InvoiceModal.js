import React, { useState, useEffect, useContext } from "react";
import "./salesModal.css";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

export default function InvoiceModal() {
  const [modal, setModal] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [eggInfo, setEggInfo] = useState("");
  const { currentUser, showToast, showError } = useContext(AuthContext);
  const [saleInfo, setSaleInfo] = useState([]);

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
      setCustomerName("");
      setInvoiceNumber("");
      setTotalAmount("");
      setDueDate("");
    }
  }, [modal]);

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }
    const salesCollection = collection(db, "sales");
    const unsubscribe = onSnapshot(salesCollection, (snapshot) => {
      const salesList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dateOfPurchase: formatFirestoreTimestamp(doc.data().dateOfPurchase),
        }));
      setSaleInfo(salesList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleCustomerChange = (e) => {
    const selectedCustomerName = e.target.value;
    const selectedSaleInfo = saleInfo.find(
      (sale) => sale.customerName === selectedCustomerName
    );

    if (selectedSaleInfo) {
      setCustomerName(selectedCustomerName);
      setTotalAmount(selectedSaleInfo.totalAmount);
      setDateOfPurchase(new Date(selectedSaleInfo.dateOfPurchase)); // Convert string to Date object
      setEggInfo(selectedSaleInfo.eggSizeQuantities);
    } else {
      setCustomerName(selectedCustomerName);
      setTotalAmount("");
      setDateOfPurchase(null);
      setEggInfo("");
    }
  };

  const handleInvoice = async (e) => {
    e.preventDefault();
    if (!dueDate || !invoiceNumber) {
      showError("Please fill in all fields.");
      return;
    }

    // Check if customerName is selected
    if (!customerName) {
      showError("Please select a customer name.");
      return;
    }

    const invoiceRef = collection(db, "invoice");
    const querySnapshot = await getDocs(
      query(
        invoiceRef,
        where("userId", "==", currentUser.uid),
        where("customerName", "==", customerName)
      )
    );

    if (!querySnapshot.empty) {
      showError(
        `An invoice already exists for the customer ${customerName}. Please create a new invoice for a different customer.`
      );
      return;
    }

    toggleModal();
    document.querySelector(".menu").classList.remove("menu-hidden");

    try {
      await addDoc(collection(db, "invoice"), {
        userId: currentUser.uid,
        customerName,
        invoiceNumber: Number(invoiceNumber),
        totalAmount: totalAmount || 0,
        dateOfPurchase: dateOfPurchase || null,
        eggInfo: eggInfo || [],
        dueDate: new Date(dueDate),
        status: "DRAFT",
      });
      showToast("Invoice created successfully!");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
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
        <div className="modal">
          <div
            onClick={() => {
              toggleModal();
              document.querySelector(".menu").classList.remove("menu-hidden");
            }}
            className="overlay"
          />
          <div className="modal-content" style={{ maxWidth: "250px" }}>
            <h2>Create Invoice</h2>
            <form action="addInvItem">
              <label htmlFor="customer-name">
                Customer Name
                <select
                  value={customerName}
                  onChange={handleCustomerChange}
                  style={{
                    width: "50vw",
                    marginLeft: "5px",
                    borderRadius: "5px",
                    padding: "10px",
                    fontSize: "15px",
                  }}
                >
                  <option value="">Select Customer</option>
                  {saleInfo.map((saleInfo, index) => (
                    <option key={index} value={saleInfo.customerName}>
                      {saleInfo.customerName}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="invoice">
                Invoice Number
                <input
                  type="number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  style={{ width: "50vw" }}
                />
              </label>

              <label htmlFor="order-date">
                Due date of payment
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
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

            <div className="modal-btns" style={{ display: "flex" }}>
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
              <button onClick={handleInvoice} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
