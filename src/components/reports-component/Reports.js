import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import MenuBar from "../MenuBar";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";

function Reports() {
  const [salesData, setSalesData] = useState([]);
  const [monthEggSales, setMonthEggSales] = useState([]);
  const [eggsData, seteggsData] = useState([]);
  const [allEggs, setAllEggs] = useState([]);
  const [totalPurchases, setTotalPurchases] = useState([]);
  const [totalPending, setTotalPending] = useState([]);
  const [totalReceived, setTotalReceived] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  //Total Eggs
  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const salesCollectionRef = collection(db, "sales");
    const q = query(
      salesCollectionRef,
      where("userId", "==", currentUser.uid),
      where("dateOfPurchase", ">=", startOfMonth),
      where("dateOfPurchase", "<=", endOfMonth)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempSalesData = [];
      querySnapshot.forEach((doc) => {
        tempSalesData.push({ id: doc.id, ...doc.data() });
      });
      setSalesData(tempSalesData);

      const totalEggsSales = tempSalesData.reduce(
        (sum, sale) => sum + sale.totalEggsSold,
        0
      );
      setMonthEggSales(totalEggsSales);
    });

    return () => unsubscribe();
  }, [currentUser]);

  //Total Sold Eggs
  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const eggsCollectionRef = collection(db, "chickenEggs");
    const q = query(
      eggsCollectionRef,
      where("userId", "==", currentUser.uid),
      where("eggsDate", ">=", startOfMonth),
      where("eggsDate", "<=", endOfMonth)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempEggsData = [];
      querySnapshot.forEach((doc) => {
        tempEggsData.push({ id: doc.id, ...doc.data() });
      });
      seteggsData(tempEggsData);

      const totalEggs = tempEggsData.reduce(
        (sum, egg) => sum + egg.totalEggs,
        0
      );
      setAllEggs(totalEggs);
    });

    return () => unsubscribe();
  }, [currentUser]);

  //Total order purchased
  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const ordersCollectionRef = collection(db, "orders");
    const q = query(
      ordersCollectionRef,
      where("userId", "==", currentUser.uid),
      where("deliveryDate", ">=", startOfMonth),
      where("deliveryDate", "<=", endOfMonth)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempOrderData = [];
      querySnapshot.forEach((doc) => {
        tempOrderData.push({ id: doc.id, ...doc.data() });
      });

      const totalOrderPurchased = tempOrderData.reduce(
        (sum, sale) => sum + sale.totalAmount,
        0
      );
      setTotalPurchases(totalOrderPurchased);

      const pendingOrders = tempOrderData.filter(
        (order) => order.status === "PENDING"
      );
      setTotalPending(pendingOrders.length);
      const receivedOrders = tempOrderData.filter(
        (order) => order.status === "RECEIVED"
      );
      setTotalReceived(receivedOrders.length);
    });

    return () => unsubscribe();
  }, [currentUser]);

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
            <p className="intro-text">Reports</p>
          </div>
        </div>
      </section>

      <div
        className="reportsContainer"
        style={{
          height: "auto",
          width: "auto",
          overflowY: "auto",
          maxHeight: "100vh",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            // backgroundColor: "red",
            color: "white",
            height: "auto",
            borderRadius: "10px",
            margin: "20px",
          }}
        >
          <p style={{ color: "white", marginLeft: "10px" }}>Inventory</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "#83A186",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "40%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p style={{ margin: "0px", fontSize: "14pt" }}>Chicken Eggs</p>
              <p style={{ fontSize: "8pt" }}>Eggs this Month</p>
              <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                {allEggs}
              </label>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <p
                  style={{
                    fontSize: "8pt",
                    margin: "0px",
                    marginRight: "auto",
                  }}
                >
                  Eggs sold this month
                </p>
                <label style={{ fontSize: "8pt", fontWeight: "bold" }}>
                  {monthEggSales}
                </label>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#83A186",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "40%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p style={{ margin: "0px", fontSize: "14pt" }}>Purchase</p>
              <p style={{ fontSize: "8pt" }}>Purchase this Month</p>
              <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
                ₱ {totalPurchases}
              </label>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <p
                  style={{
                    fontSize: "8pt",
                    margin: "0px",
                    marginRight: "auto",
                  }}
                >
                  Orders Recieved
                </p>
                <label style={{ fontSize: "8pt", fontWeight: "bold" }}>
                  {totalReceived}
                </label>
              </div>
              <div style={{ display: "flex", marginTop: "0px" }}>
                <p
                  style={{
                    fontSize: "8pt",
                    margin: "0px",
                    marginRight: "auto",
                  }}
                >
                  Pending
                </p>
                <label style={{ fontSize: "8pt", fontWeight: "bold" }}>
                  {totalPending}
                </label>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label style={{ marginBottom: "20px" }}>
              CHART OF EGGS OF THE WEEK
            </label>
            <div
              style={{
                backgroundColor: "gray",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "auto",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Total Eggs</p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Pullets</p>
            </div>

            <div
              style={{
                backgroundColor: "violet",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Small</p>
            </div>

            <div
              style={{
                backgroundColor: "purple",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Medium</p>
            </div>

            <div
              style={{
                backgroundColor: "indigo",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Large</p>
            </div>

            <div
              style={{
                backgroundColor: "lavender",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Extra Large</p>
            </div>

            <div
              style={{
                backgroundColor: "lightblue",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Jumbo</p>
            </div>
          </div>
        </div>
        <hr
          style={{
            width: "90vw",
          }}
        />
        <div
          style={{
            backgroundColor: "blue",
            height: "auto",
            borderRadius: "10px",
            margin: "10px",
            paddingBottom: "10px",
            marginBottom: "40px",
          }}
        >
          <p>Sales</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "pink",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                marginLeft: "20px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Report 1</p>
            </div>
            <div
              style={{
                backgroundColor: "orange",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Report 2</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "gray",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>This Month Graph</p>
            </div>
            <div
              style={{
                backgroundColor: "white",
                padding: "20px",
                marginRight: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                width: "50vw",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
              }}
            >
              <p>Last Month Graph</p>
            </div>
          </div>
        </div>
      </div>

      <MenuBar />
    </div>
  );
}

export default Reports;
