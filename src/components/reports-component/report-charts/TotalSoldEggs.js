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

function TotalSoldEggs() {
  const [totalSales, setTotalSales] = useState([]);
  const [totalPullets, setTotalPullets] = useState([]);
  const [totalSmall, setTotalSmall] = useState([]);
  const [totalMedium, setTotalMedium] = useState([]);
  const [totalLarge, setTotalLarge] = useState([]);
  const [totalExtraLarge, setTotalExtraLarge] = useState([]);
  const [totalJumbo, setTotalJumbo] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
      where("dateOfPurchase", ">=", startOfMonth),
      where("dateOfPurchase", "<=", endOfMonth)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempSalesData = [];
      querySnapshot.forEach((doc) => {
        const salesData = doc.data();
        tempSalesData.push({
          totalPullets: salesData.eggSizeQuantities.Pullets,
          totalSmall: salesData.eggSizeQuantities.Small,
          totalMedium: salesData.eggSizeQuantities.Medium,
          totalLarge: salesData.eggSizeQuantities.Large,
          totalExtraLarge: salesData.eggSizeQuantities.ExtraLarge,
          totalJumbo: salesData.eggSizeQuantities.Jumbo,
        });
      });
      setTotalPullets(
        tempSalesData.reduce((sum, sale) => sum + sale.totalPullets, 0)
      );
      setTotalSmall(
        tempSalesData.reduce((sum, sale) => sum + sale.totalSmall, 0)
      );
      setTotalMedium(
        tempSalesData.reduce((sum, sale) => sum + sale.totalMedium, 0)
      );
      setTotalLarge(
        tempSalesData.reduce((sum, sale) => sum + sale.totalLarge, 0)
      );
      setTotalExtraLarge(
        tempSalesData.reduce((sum, sale) => sum + sale.totalExtraLarge, 0)
      );
      setTotalJumbo(
        tempSalesData.reduce((sum, sale) => sum + sale.totalJumbo, 0)
      );
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formattedData = [
    {
      size: "Pullets",
      total: totalPullets,
    },
    {
      size: "Small",
      total: totalSmall,
    },
    {
      size: "Medium",
      total: totalMedium,
    },
    {
      size: "Large",
      total: totalLarge,
    },
    {
      size: "X-Large",
      total: totalExtraLarge,
    },
    {
      size: "Jumbo",
      total: totalJumbo,
    },
  ];

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
        Total Eggs Sold Per Size
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={formattedData}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 15,
          }}
          barSize={50}
        >
          <XAxis
            dataKey="size"
            angle={-45}
            textAnchor="end"
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
            dataKey="total"
            fill="#E3E3CE"
            activeBar={<Rectangle fill="white" stroke="#83A186" />}
          />
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{ textAlign: "center", marginTop: "0px", marginBottom: "15px" }}
      ></div>
    </div>
  );
}

export default TotalSoldEggs;
