import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, getDoc, updateDoc, doc } from "firebase/firestore";
import MenuBar from "../MenuBar";
import Modal from "../modal/Modal";
import { db } from "../../firebase";

function InventoryList() {
  const [activeLink, setActiveLink] = useState("");
  const [chickenStock, setChickenStock] = useState(0);
  const [chickenFeeds, setChickenFeeds] = useState(0);
  const [pullets, setPullets] = useState(0);
  const [small, setSmall] = useState(0);
  const [medium, setMedium] = useState(0);
  const [large, setLarge] = useState(0);
  const [xLarge, setXLarge] = useState(0);
  const [jumbo, setJumbo] = useState(0);
  const [totalEggs, setTotalEggs] = useState(0);

  useEffect(() => {
    const fetchInventoryData = async () => {
      const docRef = doc(db, "inventory", "PTLoZvdciACLA6uiciRE");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setChickenStock(Number(data.chickenStock) || 0);
        setChickenFeeds(Number(data.chickenFeeds) || 0);
        setPullets(Number(data.eggPullets) || 0);
        setSmall(Number(data.eggSmall) || 0);
        setMedium(Number(data.eggMedium) || 0);
        setLarge(Number(data.eggLarge) || 0);
        setXLarge(Number(data.eggXLarge) || 0);
        setJumbo(Number(data.eggJumbo) || 0);
        console.log("No such document!");
      }
    };

    fetchInventoryData();
  }, []);

  useEffect(() => {
    const calculateTotalEggs = () => {
      const total = pullets + small + medium + large + xLarge + jumbo;
      setTotalEggs(total);
    };

    calculateTotalEggs();
  }, [pullets, small, medium, large, xLarge, jumbo]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const updateChickenStock = async (newStock) => {
    console.log("Updating chicken stock to:", newStock);
    const stockNumber = Number(newStock);

    setChickenStock(stockNumber);

    const chickenStockRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");
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

  const updateChickenEggs = async (eggInputs) => {
    console.log("Updating chicken eggs to:", eggInputs);

    // Update local state
    setPullets(Number(eggInputs.eggPullets) || 0);
    setSmall(Number(eggInputs.eggSmall) || 0);
    setMedium(Number(eggInputs.eggMedium) || 0);
    setLarge(Number(eggInputs.eggLarge) || 0);
    setXLarge(Number(eggInputs.eggXLarge) || 0);
    setJumbo(Number(eggInputs.eggJumbo) || 0);

    const eggInputsRef = doc(db, "inventory", "2J5KZ2IeFVQYJISAegb6");
    try {
      await updateDoc(eggInputsRef, {
        eggPullets: eggInputs.eggPullets,
        eggSmall: eggInputs.eggSmall,
        eggMedium: eggInputs.eggMedium,
        eggLarge: eggInputs.eggLarge,
        eggXLarge: eggInputs.eggXLarge,
        eggJumbo: eggInputs.eggJumbo,
      });
      console.log("Chicken eggs updated successfully in Firestore");
    } catch (error) {
      console.error("Error updating chicken eggs in Firestore: ", error);
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
                to="/dashboard"
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

      <div className="sectionContainer">
        <section id="inventory-body" className="content-body">
          <div className="container">
            <nav>
              <Link
                to="/inventory-list"
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
                Inventory
              </Link>
              <Link
                to="/inventory-orders"
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
                    <output name="pullets">{pullets}</output> <br />
                    <label>SMALL: </label>
                    <output name="small">{small}</output> <br />
                    <label>MEDIUM: </label>
                    <output name="medium">{medium}</output> <br />
                  </div>
                  <div className="form-column">
                    <label>LARGE: </label>
                    <output name="large">{large}</output> <br />
                    <label>EX-LARGE: </label>
                    <output name="x-large">{xLarge}</output> <br />
                    <label>JUMBO: </label>
                    <output name="jumbo">{jumbo}</output> <br />
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <label>TOTAL EGGS IN STOCK: </label>
                  <output name="total">{totalEggs}</output> <br />
                </div>
              </form>
            </div>
          </div>
          <Modal
            updateChickenStock={updateChickenStock}
            updateChickenFeeds={updateChickenFeeds}
            updateChickenEggs={updateChickenEggs}
          />
        </section>
      </div>
      <MenuBar />
    </div>
  );
}

export default InventoryList;
