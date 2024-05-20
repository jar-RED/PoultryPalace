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

function TotalExtraLargeChart() {
  const [extraLargeData, setExtraLargeData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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
      where("eggsDate", ">=", sevenDaysAgo),
      where("eggsDate", "<=", now)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempEggsData = [];
      querySnapshot.forEach((doc) => {
        const eggData = doc.data();
        tempEggsData.push({
          date: eggData.eggsDate,
          extraLargeCollected: eggData.extraLarge,
        });
      });
      setExtraLargeData(tempEggsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const formattedData = extraLargeData.map((egg) => ({
    date: egg.date.toDate
      ? `${egg.date.toDate().getMonth() + 1}-${egg.date.toDate().getDate()}-${egg.date.toDate().getFullYear()}`
      : "",
    extraLargeCollected: egg.extraLargeCollected,
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
        Extra Large Eggs Collected
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
            dataKey="extraLargeCollected"
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

export default TotalExtraLargeChart;
