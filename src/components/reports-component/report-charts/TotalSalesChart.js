import { useEffect, useState } from "react";
import { useContext } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AuthContext } from "../../login-context/AuthContext";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function TotalSalesChart() {
  const [totalSales, setTotalSales] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  //Total Sold Eggs
  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found.");
      return;
    }

    const eggsCollectionRef = collection(db, "sales");
    const q = query(
      eggsCollectionRef,
      where("userId", "==", currentUser.uid),
      where("dateOfPurchase", ">=", sevenDaysAgo),
      where("dateOfPurchase", "<=", now)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempSalesData = [];
      querySnapshot.forEach((doc) => {
        const salesData = doc.data();
        tempSalesData.push({
          date: salesData.dateOfPurchase,
          totalSale: salesData.totalEggsSold,
        });
      });
      setTotalSales(tempSalesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formattedData = totalSales.map((sale) => ({
    date: sale.date.toDate
      ? `${sale.date.toDate().getMonth() + 1}-${sale.date.toDate().getDate()}-${sale.date.toDate().getFullYear()}`
      : "",
    totalSale: sale.totalSale,
  }));

  return (
    <div
      style={{
        minWidth: "100%",
        maxHeight: "100vh",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        background: "rgb(131, 161, 134)",
        marginBottom: "20px",
      }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "10px", marginTop: "5px" }}
      >
        Sales Data
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={formattedData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: "8pt" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white", fontSize: "8pt" }}
          />
          <Tooltip />

          <Bar
            dataKey="totalSale"
            fill="#E3E3CE"
            activeBar={<Rectangle fill="white" stroke="#83A186" />}
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{ textAlign: "center", marginTop: "0px", marginBottom: "10px" }}
      >
        Date
      </div>
    </div>
  );
}

export default TotalSalesChart;
