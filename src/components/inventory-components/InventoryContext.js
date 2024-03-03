// // InventoryContext.js
// import React, { createContext, useState } from "react";

// export const InventoryContext = createContext();

// export const InventoryProvider = ({ children }) => {
//   const [inventory, setInventory] = useState({
//     inventory: {},
//     chickenStock: 0,
//     chickenEggs: {
//       pullets: 0,
//       small: 0,
//       medium: 0,
//       large: 0,
//       xLarge: 0,
//       jumbo: 0,
//     },
//     chickenFeeds: 0,
//   });

//   const updateInventory = (category, value) => {
//     setInventory((prevInventory) => ({
//       ...prevInventory,
//       [category]: value,
//     }));
//   };

//   return (
//     <InventoryContext.Provider value={{ inventory, updateInventory }}>
//       {children}
//     </InventoryContext.Provider>
//   );
// };
