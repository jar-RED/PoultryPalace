import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { StockModal } from "./StockModal";
import { db } from "../../firebase";
import { FeedsModal } from "./FeedsModal";
import { EggsModal } from "./EggsModal";
import { AuthContext } from "../login-context/AuthContext";
import EditStock from "./EditStock";
import EditFeeds from "./EditFeeds";
import EditEggs from "./EditEggs";
import EggPrice from "./EggPrice";
import EggsAlert from "./EggsAlert";

function InventoryEmpty() {
  const [activeLink, setActiveLink] = useState("");
  const [isStocksModalOpen, setIsStocksModalOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isFeedsModalOpen, setIsFeedsModalOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eggs, setEggs] = useState([]);
  const { currentUser, showToast, showError } = useContext(AuthContext);
  const [isEditStockModalOpen, setIsEditStockModalOpen] = useState(false);
  const [isEditFeedModalOpen, setIsEditFeedModalOpen] = useState(false);
  const [isEditEggModalOpen, setIsEditEggModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(false);
  const [selectedFeeds, setSelectedFeeds] = useState(false);
  const [selectedEggs, setSelectedEggs] = useState(false);
  const [eggsData, setEggsData] = useState({
    totalPullets: 0,
    totalSmall: 0,
    totalMedium: 0,
    totalLarge: 0,
    totalExtraLarge: 0,
    totalJumbo: 0,
    overallTotal: 0,
  });
  const [isPriceInputModalOpen, setIsPriceInputModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [eggsAlert, setEggsAlert] = useState("");

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleAddStockClick = () => {
    setIsStocksModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleAddFeedsClick = () => {
    setIsFeedsModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleAddEggsClick = () => {
    setIsModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsEditStockModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleFeedsClick = (feed) => {
    setSelectedFeeds(feed);
    setIsEditFeedModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handlePulletEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "pullets" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleSmallEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "small" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleMediumEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "medium" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleLargeEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "large" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleExtraLargeEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "extraLarge" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleJumboEggsClick = (egg) => {
    setSelectedEggs({ ...egg, eggType: "jumbo" });
    setIsEditEggModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleAlertInput = () => {
    setIsAlertModalOpen(true);
    document.querySelector(".menu").classList.add("menu-hidden");
  };

  const handleEggsAlertChange = (newAlert) => {
    setEggsAlert(newAlert);
    console.log("New egg alert:", newAlert);
  };

  const formatFirestoreTimestamp = (timestamp) => {
    if (
      !timestamp ||
      typeof timestamp !== "object" ||
      timestamp instanceof Date
    ) {
      return "";
    }
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
    const stocksCollection = collection(db, "chickenStock");
    const unsubscribe = onSnapshot(stocksCollection, (snapshot) => {
      const stocksList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          stockDate: formatFirestoreTimestamp(doc.data().stockDate),
        }));
      stocksList.sort((a, b) => new Date(b.stockDate) - new Date(a.stockDate));
      setStocks(stocksList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  //Deleting stock item
  const deleteStock = async (stockId) => {
    try {
      await deleteDoc(doc(db, "chickenStock", stockId));
      showToast("Stock deleted successfully");
      console.log("Stock deleted successfully");
      setStocks(stocks.filter((stock) => stock.id !== stockId));
    } catch (error) {
      console.error("Error deleting stock item: ", error);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }
    const feedsCollection = collection(db, "chickenFeeds");
    const unsubscribe = onSnapshot(feedsCollection, (snapshot) => {
      const feedsList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          feedsDate: formatFirestoreTimestamp(doc.data().feedsDate),
        }));
      feedsList.sort((a, b) => new Date(b.feedsDate) - new Date(a.feedsDate));
      setFeeds(feedsList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  //Deleting feed item
  const deleteFeed = async (feedId) => {
    try {
      await deleteDoc(doc(db, "chickenFeeds", feedId));
      console.log("Feed item deleted successfully");
      showToast("Feed item deleted successfully");
      setFeeds(feeds.filter((feed) => feed.id !== feedId));
    } catch (error) {
      console.error("Error deleting feed item: ", error);
    }
  };

  const [eggSold, setEggSold] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }
    const soldCollection = collection(db, "sales");
    const unsubscribe = onSnapshot(soldCollection, (snapshot) => {
      const soldList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setEggSold(soldList);
    });
    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser || !eggSold) {
      console.log("No current user found.");
      return;
    }
    const eggsCollection = collection(db, "chickenEggs");
    const unsubscribe = onSnapshot(eggsCollection, (snapshot) => {
      const eggsList = snapshot.docs
        .filter((doc) => doc.data().userId === currentUser.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          eggsDate: formatFirestoreTimestamp(doc.data().eggsDate),
        }));
      eggsList.sort((a, b) => new Date(b.eggsDate) - new Date(a.eggsDate));

      setEggs(eggsList);

      let eggSoldQuantities = {
        Small: 0,
        Medium: 0,
        Pullets: 0,
        Large: 0,
        XLarge: 0,
        Jumbo: 0,
      };
      if (eggSold.length > 0) {
        eggSold.forEach((sale) => {
          Object.entries(sale.eggSizeQuantities).forEach(([size, quantity]) => {
            if (eggSoldQuantities[size]) {
              eggSoldQuantities[size] += parseInt(quantity);
            } else {
              eggSoldQuantities[size] = parseInt(quantity);
            }
          });
        });
      }

      const totalSmall =
        eggsList.reduce((acc, curr) => acc + curr.small, 0) -
        eggSoldQuantities.Small;
      const totalMedium =
        eggsList.reduce((acc, curr) => acc + curr.medium, 0) -
        eggSoldQuantities.Medium;
      const totalPullets =
        eggsList.reduce((acc, curr) => acc + curr.pullets, 0) -
        eggSoldQuantities.Pullets;
      const totalLarge =
        eggsList.reduce((acc, curr) => acc + curr.large, 0) -
        eggSoldQuantities.Large;
      const totalExtraLarge =
        eggsList.reduce((acc, curr) => acc + curr.extraLarge, 0) -
        eggSoldQuantities.ExtraLarge;
      const totalJumbo =
        eggsList.reduce((acc, curr) => acc + curr.jumbo, 0) -
        eggSoldQuantities.Jumbo;
      const overallTotal =
        totalSmall +
        totalMedium +
        totalPullets +
        totalLarge +
        totalExtraLarge +
        totalJumbo;

      const docPath = doc(
        db,
        "overallEggs",
        `${currentUser.uid}_overallChickenEggs`
      );
      setDoc(docPath, {
        totalPullets,
        totalSmall,
        totalMedium,
        totalLarge,
        totalExtraLarge,
        totalJumbo,
        overallTotal,
      })
        .then(() => {
          console.log("Aggregation successful!");
        })
        .catch((error) => {
          console.error("Error aggregating egg quantities: ", error);
        });
    });

    return () => unsubscribe();
  }, [currentUser, eggSold]);

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const docPath = doc(
      db,
      "overallEggs",
      `${currentUser.uid}_overallChickenEggs`
    );

    const unsubscribe = onSnapshot(docPath, (docSnap) => {
      if (docSnap.exists()) {
        setEggsData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const docPath = doc(db, "overallEggs", `${currentUser.uid}_eggsAlert`);

    const unsubscribe = onSnapshot(docPath, (docSnap) => {
      if (docSnap.exists()) {
        setEggsAlert(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <header>
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
        </header>
      </section>
      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link
              to="/inventory"
              className="inv-list"
              style={{
                backgroundColor:
                  activeLink === "inventory" ? "inventory" : "#3a4d39",
                borderRadius: "15px",
              }}
              onClick={() => handleLinkClick("inventory")}
            >
              {" "}
              Inventory
            </Link>
            <Link to="/inventory-orders" className="inv-order">
              {" "}
              Orders
            </Link>
          </nav>
        </div>
        <div
          style={{
            overflowY: "auto",
            maxHeight: "100vh",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <div id="inv-order-container" className="inv-body-list-container">
            <div
              style={{
                backgroundColor: "#83a186",
                height: "auto",
                borderRadius: "20px",
                margin: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  marginTop: "0px",
                  paddingTop: "10px",
                  color: "white",
                }}
              >
                Inventory Items
              </h3>

              <div className="chickenStockCont">
                <div>
                  <div style={{ display: "flex" }}>
                    <h4
                      style={{
                        marginBottom: "0px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      Chicken Stock
                    </h4>
                    <img
                      src="assets/images/add-square.svg"
                      style={{
                        height: "5vh",
                        marginBottom: "0px",
                        marginLeft: "auto",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                      onClick={handleAddStockClick}
                    />
                  </div>
                  <hr
                    style={{
                      width: "80vw",
                      backgroundColor: "black",
                    }}
                  />
                </div>
                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {stocks.map((stock, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "rgb(250 255 227)",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleStockClick(stock)}
                    >
                      <label>Quantity:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {stock.stockQuantity}
                      </label>{" "}
                      <br />
                      <label>Alert: {stock.stockAlert}</label> <br />
                      <label>{stock.stockDate}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chickenFeedsCont" style={{ marginTop: "10px" }}>
                <div>
                  <div style={{ display: "flex" }}>
                    <h4
                      style={{
                        marginBottom: "0px",
                        marginLeft: "20px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      Chicken Feeds
                    </h4>
                    <img
                      src="assets/images/add-square.svg"
                      style={{
                        height: "5vh",
                        marginBottom: "0px",
                        marginLeft: "auto",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                      onClick={handleAddFeedsClick}
                    />
                  </div>
                  <hr style={{ width: "80vw", backgroundColor: "black" }} />
                </div>
                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    marginRight: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                  }}
                >
                  {feeds.map((feed, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                        textAlign: "center",
                        background: "rgb(250 255 227)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleFeedsClick(feed)}
                    >
                      <label>Quantity:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {feed.feedQuantity}
                      </label>{" "}
                      <br />
                      <label>Alert: {feed.feedAlert}</label> <br />
                      <label>{feed.feedsDate}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="eggsContainer"
              style={{
                background: "#83a186",
                height: "auto",
                borderRadius: "20px",
                margin: "20px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="chickenEggsCont">
                <div>
                  <div style={{ display: "flex" }}>
                    <h4
                      style={{
                        marginBottom: "0px",
                        marginLeft: "20px",
                        marginTop: "20px",
                        color: "rgb(250 255 227)",
                      }}
                      onClick={handleAlertInput}
                    >
                      Chicken Eggs
                    </h4>
                    <img
                      src="assets/images/add-square.svg"
                      style={{
                        height: "5vh",
                        marginBottom: "0px",
                        marginLeft: "auto",
                        marginRight: "20px",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                      onClick={handleAddEggsClick}
                    />
                  </div>
                  <hr style={{ width: "80vw", backgroundColor: "black" }} />
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Pullets:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalPullets}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                        textAlign: "center",
                        cursor: "pointer",
                        background: "rgb(250 255 227)",
                      }}
                      onClick={() => handlePulletEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.pullets}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Small:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalSmall}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        cursor: "pointer",
                        marginBottom: "10px",
                        textAlign: "center",
                        background: "rgb(250 255 227)",
                      }}
                      onClick={() => handleSmallEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.small}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Medium:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalMedium}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        cursor: "pointer",
                        marginBottom: "10px",
                        textAlign: "center",
                        background: "rgb(250 255 227)",
                      }}
                      onClick={() => handleMediumEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.medium}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Large:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalLarge}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                        textAlign: "center",
                        cursor: "pointer",
                        background: "rgb(250 255 227)",
                      }}
                      onClick={() => handleLargeEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.large}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Extra Large:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalExtraLarge}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                        textAlign: "center",
                        background: "rgb(250 255 227)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleExtraLargeEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.extraLarge}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <h4
                    style={{
                      marginBottom: "5px",
                      marginLeft: "20px",
                      marginTop: "10px",
                      color: "rgb(250 255 227)",
                    }}
                  >
                    Jumbo:
                  </h4>

                  <div>
                    <h4
                      style={{
                        marginBottom: "5px",
                        marginLeft: "10px",
                        marginTop: "10px",
                        color: "rgb(250 255 227)",
                      }}
                    >
                      {eggsData.totalJumbo}
                    </h4>
                  </div>
                </div>

                <div
                  className="inptContainer"
                  style={{
                    // background: "green",
                    display: "flex",
                    marginLeft: "20px",
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  {eggs.map((egg, index) => (
                    <div
                      style={{
                        flexShrink: 0,
                        height: "auto",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                        textAlign: "center",
                        background: "rgb(250 255 227)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleJumboEggsClick(egg)}
                    >
                      <label>Collected:</label> <br />
                      <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                        {egg.jumbo}
                      </label>{" "}
                      <br />
                      <label>Date:</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Total Eggs: {eggsData.overallTotal}
                  </h4>
                  <h4
                    style={{
                      marginLeft: "20px",
                      color: "white",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Alert: {eggsAlert.alertValue}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StockModal
        isOpen={isStocksModalOpen}
        onClose={() => {
          setIsStocksModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
      />
      <FeedsModal
        isOpen={isFeedsModalOpen}
        onClose={() => {
          setIsFeedsModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
      />
      <EggsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
      />
      <EditStock
        isOpen={isEditStockModalOpen}
        onClose={() => {
          setIsEditStockModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedStock={selectedStock}
        deleteStock={deleteStock}
      />

      <EditFeeds
        isOpen={isEditFeedModalOpen}
        onClose={() => {
          setIsEditFeedModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedFeeds={selectedFeeds}
        deleteFeed={deleteFeed}
      />

      <EditEggs
        isOpen={isEditEggModalOpen}
        onClose={() => {
          setIsEditEggModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedEggs={selectedEggs}
        eggType={selectedEggs.eggType}
      />

      <EggPrice
        isOpen={isPriceInputModalOpen}
        onClose={() => {
          setIsPriceInputModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        selectedEggs={selectedEggs}
        eggType={selectedEggs.eggType}
      />

      <EggsAlert
        isOpen={isAlertModalOpen}
        onClose={() => {
          setIsAlertModalOpen(false);
          document.querySelector(".menu").classList.remove("menu-hidden");
        }}
        onEggsAlertChange={handleEggsAlertChange}
      />
    </div>
  );
}

export default InventoryEmpty;
