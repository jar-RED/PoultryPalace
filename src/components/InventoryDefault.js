import React from "react";
import InventoryEmpty from "./inventory-components/InventoryEmpty";
import MenuBar from "./MenuBar";

// const StyledDiv = div`
//   display: flex;
//   color: {...props => props.color}
// `

function InventoryDefault() {
  return (
    <>
      <InventoryEmpty />
      <MenuBar />
    </>
  );
}

export default InventoryDefault;
