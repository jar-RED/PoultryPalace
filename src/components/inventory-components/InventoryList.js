import React, { useState, useEffect } from "react";
import MenuBar from "../MenuBar";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

const InventoryList = () => {
  const [activeLink, setActiveLink] = useState("");
  const [chickenStock, setChickenStock] = useState(0);
  const [chickenFeeds, setChickenFeeds] = useState(0);

  useEffect(() => {
    const fetchInventoryData = async () => {
      const docRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setChickenStock(data.chickenStock || 0);
        setChickenFeeds(data.chickenFeeds || 0);
      } else {
        console.log("No such document!");
      }
    };

    fetchInventoryData();
  }, []);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const updateChickenStock = async (newStock) => {
    console.log("Updating chicken stock to:", newStock);
    const stockNumber = Number(newStock);

    // Update local state
    setChickenStock(stockNumber);
    const chickenStockRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");

    // Update the chickenStock field in Firestore
    try {
      await updateDoc(chickenStockRef, {
        chickenStock: stockNumber,
      });
      console.log("Chicken stock updated successfully in Firestore");
    } catch (error) {
      console.error("Error updating chicken stock in Firestore: ", error);
    }
  };

  const updateChickenFeeds = async (newFeeds) => {
    console.log("Updating chicken feeds to:", newFeeds);

    const feedNumber = Number(newFeeds);

    // Update local state
    setChickenFeeds(newFeeds);
    const chickenFeedRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");

    // Update the chickenFeed field in Firestore
    try {
      await updateDoc(chickenFeedRef, {
        chickenFeeds: feedNumber,
      });
      console.log("Chicken feeds updated successfully in Firestore");
    } catch (error) {
      console.error("Error updating chicken feeds in Firestore: ", error);
    }
  };

  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <div className="header-content">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
          <div className="main-header-text">
            <p>
              {" "}
              <Link
                to={"/dashboard"}
                className="web-name"
                style={{ textDecoration: "none" }}
              >
                {" "}
                JOYLISA WEB
              </Link>{" "}
            </p>
            <p className="intro-text">Inventory</p>
          </div>
        </div>
      </section>

      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link
              to={"/inventory-list"}
              className="inv-list"
              style={{
                backgroundColor:
                  activeLink === "inventory-list"
                    ? "inventory-list"
                    : "#3a4d39",
                borderRadius: "20px",
              }}
              onClick={() => handleLinkClick("inventory-list")}
            >
              {" "}
              Inventory List
            </Link>
            <Link
              to={"/inventory-orders"}
              className="inv-order"
              style={{
                backgroundColor: activeLink === "inventory-orders" ? "" : "",
              }}
              onClick={() => handleLinkClick("inventory-orders")}
            >
              {" "}
              Orders
            </Link>
          </nav>
        </div>
        <div id="inv-main-container">
          <div id="chicken-stock">
            <form action="">
              <h4>
                CHICKEN <br />
                STOCK
              </h4>
              <label htmlFor="chicken-stock">STOCK: </label>
              <output name="chicken-stock">{chickenStock}</output>
            </form>
          </div>

          <div id="chicken-feeds">
            <form action="">
              <h4>
                CHICKEN <br />
                FEEDS
              </h4>
              <label htmlFor="chicken-feeds">STOCK: </label>
              <output name="chicken-feeds">{chickenFeeds}</output>
            </form>
          </div>
        </div>

        <div id="main-container-2">
          <div id="chicken-eggs">
            <form className="egg-cont">
              <h4>CHICKEN EGGS</h4>
              <div className="form-row">
                <div className="form-column">
                  <label>PULLETS: </label>
                  <output name="pullets">00</output> <br />
                  <label>SMALL: </label>
                  <output name="small">00</output> <br />
                  <label>MEDIUM: </label>
                  <output name="medium">00</output> <br />
                </div>
                <div className="form-column">
                  <label>LARGE: </label>
                  <output name="large">00</output> <br />
                  <label>EXTRA LARGE: </label>
                  <output name="x-large">00</output> <br />
                  <label>JUMBO: </label>
                  <output name="jumbo">00</output> <br />
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <label>TOTAL EGGS IN STOCK: </label>
                <output name="total">00</output> <br />
              </div>
            </form>
          </div>
        </div>
      </section>
      <Modal
        updateChickenStock={updateChickenStock}
        updateChickenFeeds={updateChickenFeeds}
      />
      <MenuBar />
    </div>
  );
};

export default InventoryList;
