import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import MenuBar from "../MenuBar";
import { db } from "../../firebase";
import { AuthContext } from "../login-context/AuthContext";
import { NotificationContext } from "./NotificationProvider";

function Notification() {
  const { currentUser } = useContext(AuthContext);
  const [ordersData, setOrdersData] = useState([]);
  const { addNotification, notifications, setNotifications } =
    useContext(NotificationContext);
  const currentDate = new Date();
  const notifiedOrders = useRef(new Set());
  const [targetDoc, setTargetDoc] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const ordersCollectionRef = collection(db, "orders");
    const q = query(
      ordersCollectionRef,
      where("userId", "==", currentUser.uid)
    );

    const unsubscribeOrders = onSnapshot(q, (querySnapshot) => {
      const tempOrderData = [];
      querySnapshot.forEach((doc) => {
        tempOrderData.push({ id: doc.id, ...doc.data() });
      });
      setOrdersData(tempOrderData);
    });

    return () => unsubscribeOrders();
  }, [currentUser]);

  useEffect(() => {
    ordersData.forEach((order) => {
      const deliveryDate = new Date(order.deliveryDate.seconds * 1000); // Convert Firestore timestamp to Date

      // Normalize dates to only year, month, and day
      const currentDateStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );
      const deliveryDateStart = new Date(
        deliveryDate.getFullYear(),
        deliveryDate.getMonth(),
        deliveryDate.getDate()
      );

      // Compare dates
      if (currentDateStart.getTime() === deliveryDateStart.getTime()) {
        setTargetDoc(order);
      }
    });
  }, [ordersData, currentDate]);

  //   useEffect(() => {
  //     const addNotificationAsync = async () => {
  //       if (!currentUser || !targetDoc) {
  //         console.log("No current user or target doc found.");
  //         return;
  //       }

  //       // Check if a similar notification already exists for the current user
  //       const notificationQuery = query(
  //         collection(db, "notifications"),
  //         where("userId", "==", currentUser.uid),
  //         targetDoc && where("orderCategory", "==", targetDoc.orderCategory), // Add condition to check if targetDoc is defined
  //         where("timestamp", "==", targetDoc.deliveryDate) // Assuming timestamp is stored as date string
  //       );

  //       const querySnapshot = await getDocs(notificationQuery);
  //       if (!querySnapshot.empty) {
  //         console.log("Notification already exists for today.");
  //         return;
  //       }

  //       // If no similar notification exists, add the new notification
  //       try {
  //         await addDoc(collection(db, "notifications"), {
  //           userId: currentUser.uid,
  //           title: "Delivery Reminder",
  //           body: `Your order for ${targetDoc.orderCategory} should be delivered today.`,
  //           read: false,
  //           timestamp: new Date().toISOString(),
  //           orderCategory: targetDoc.orderCategory, // Add order category for easy querying
  //         });
  //       } catch (error) {
  //         console.error("Failed to add notification:", error);
  //       }
  //     };

  //     addNotificationAsync();
  //   }, [currentUser, targetDoc]);

  return (
    <div>
      <section id="inventory-header" className="header-welcome">
        <div className="header-content">
          <img src="assets/images/farm-logo.png" alt="farm-logo" />
          <div className="main-header-text">
            <p>
              <Link
                to="/dashboard"
                className="web-name"
                style={{ textDecoration: "none" }}
              >
                JOYLISA WEB
              </Link>
            </p>
            <p className="intro-text">Notifications</p>
          </div>
        </div>
      </section>

      <section id="inventory-body" className="content-body">
        <div
          style={{
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "60px",
            marginBottom: "auto",
            marginLeft: "30px",
            marginRight: "30px",
            borderRadius: "60px",
            padding: "20px",
          }}
        >
          {/* <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <h3>{notification.title}</h3>
                <label>{notification.body}</label>
              </li>
            ))}
          </ul> */}
          <img
            src="../../assets/images/work-in-progress.gif"
            style={{ width: "30vh", height: "30vh" }}
          />
        </div>
        <h3
          style={{ textAlign: "center", fontWeight: "normal", color: "white" }}
        >
          Currently Under Development
        </h3>
      </section>

      <MenuBar />
    </div>
  );
}

export default Notification;
