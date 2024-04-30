import React from "react";
import { Link } from "react-router-dom";
import Modal from "../modal/Modal";

function InventoryEmpty() {
  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <header>
          <div className="header-content">
            <img src="assets/images/farm-logo.png" alt="farm-logo" />
            <div className="main-header-text">
              <p className="web-name">JOYLISA WEB</p>
              <p className="intro-text">Inventory</p>
            </div>
          </div>
        </header>
      </section>

      <section id="inventory-body" className="content-body">
        <div className="container">
          <nav>
            <Link to="/inventory-list" className="inv-list">
              {" "}
              Inventory
            </Link>
            <Link to="/inventory-orders" className="inv-order">
              {" "}
              Orders
            </Link>
          </nav>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "93vh" }}>
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
                      }}
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
                    overflowX: "auto",
                    maxWidth: "94%",
                    marginRight: "20px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "10px",
                      width: "95px",
                      color: "#40513e",
                    }}
                  >
                    <label>4</label> <br />
                    <label>Alert: </label> <br />
                    <label>xx-xx-xxxx</label>
                  </div>
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
                      }}
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
                  <div
                    style={{
                      flexShrink: 0,
                      backgroundColor: "white",
                      height: "12vh",
                      borderRadius: "15px",
                      marginRight: "10px",
                      width: "95px",
                      marginBottom: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      backgroundColor: "white",
                      height: "12vh",
                      borderRadius: "15px",
                      marginRight: "10px",
                      width: "95px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      backgroundColor: "white",
                      height: "12vh",
                      borderRadius: "15px",
                      marginRight: "10px",
                      width: "95px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                  <div
                    style={{
                      flexShrink: 0,
                      backgroundColor: "white",
                      height: "12vh",
                      borderRadius: "15px",
                      marginRight: "10px",
                      width: "95px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
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
                        marginTop: "10px",
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
                      }}
                    />
                  </div>
                  <hr style={{ width: "80vw", backgroundColor: "black" }} />
                </div>
                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>

                <h5
                  style={{
                    marginBottom: "5px",
                    marginLeft: "20px",
                    marginTop: "10px",
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
                  }}
                >
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input</label>
                  </div>
                  <div
                    style={{
                      height: "12vh",
                      background: "white",
                      borderRadius: "15px",
                      marginRight: "15px",
                    }}
                  >
                    <label>sample input2</label>
                  </div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginLeft: "20px" }}>Total Eggs:</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InventoryEmpty;
