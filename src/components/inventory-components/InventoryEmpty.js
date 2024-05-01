import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { StockModal } from "./StockModal";
import { db } from "../../firebase";
import { FeedsModal } from "./FeedsModal";
import { EggsModal } from "./EggsModal";

function InventoryEmpty() {
  const [activeLink, setActiveLink] = useState("");
  const [isStocksModalOpen, setIsStocksModalOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isFeedsModalOpen, setIsFeedsModalOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eggs, setEggs] = useState([]);
  const [totalEggs, setTotalEggs] = useState(0);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleAddStockClick = () => {
    setIsStocksModalOpen(true);
  };

  const handleAddFeedsClick = () => {
    setIsFeedsModalOpen(true);
  };

  const handleAddEggsClick = () => {
    setIsModalOpen(true);
  };

  const formatFirestoreTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const stocksCollection = collection(db, "chickenStock");
    const unsubscribe = onSnapshot(stocksCollection, (snapshot) => {
      const stocksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        stockDate: formatFirestoreTimestamp(doc.data().stockDate),
      }));
      stocksList.sort((a, b) => new Date(b.stockDate) - new Date(a.stockDate));
      setStocks(stocksList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const feedsCollection = collection(db, "chickenFeeds");
    const unsubscribe = onSnapshot(feedsCollection, (snapshot) => {
      const feedsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        feedsDate: formatFirestoreTimestamp(doc.data().feedsDate),
      }));
      feedsList.sort((a, b) => new Date(b.feedsDate) - new Date(a.feedsDate));
      setFeeds(feedsList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const eggsCollection = collection(db, "chickenEggs");
    const unsubscribe = onSnapshot(eggsCollection, (snapshot) => {
      const eggsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        eggsDate: formatFirestoreTimestamp(doc.data().eggsDate),
      }));
      eggsList.sort((a, b) => new Date(b.eggsDate) - new Date(a.eggsDate));
      setEggs(eggsList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let total = 0;
    eggs.forEach((egg) => {
      total += egg.totalEggs;
    });
    setTotalEggs(total);
  }, [eggs]);

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
        <div style={{ overflowY: "auto", maxHeight: "92vh" }}>
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
                  marginTop: "10px",
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
                        color: "#e3e3ce",
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
                        height: "12vh",
                        background: "#e3e3ce",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                      }}
                    >
                      <label>{stock.stockQuantity}</label> <br />
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
                        color: "#e3e3ce",
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{feed.feedQuantity}</label> <br />
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
                        color: "#e3e3ce",
                      }}
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
                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Pullets
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.pullets}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Small
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.small}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Medium
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.medium}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Large
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.large}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Extra Large
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.extraLarge}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
                    color: "#e3e3ce",
                  }}
                >
                  Jumbo
                </h5>
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
                        height: "12vh",
                        background: "white",
                        borderRadius: "15px",
                        marginRight: "10px",
                        width: "95px",
                        color: "#40513e",
                        marginBottom: "10px",
                      }}
                    >
                      <label>{egg.jumbo}</label> <br />
                      <label>{egg.eggsDate}</label>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4
                    style={{
                      marginLeft: "20px",
                      color: "white",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    Total Eggs: {totalEggs}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StockModal
        isOpen={isStocksModalOpen}
        onClose={() => setIsStocksModalOpen(false)}
      />
      <FeedsModal
        isOpen={isFeedsModalOpen}
        onClose={() => setIsFeedsModalOpen(false)}
      />
      <EggsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default InventoryEmpty;
