import React from "react";
import InventoryEmpty from "./inventory-components/InventoryEmpty";
import MenuBar from "./MenuBar";
import AddButton from "./AddButton";

// const StyledDiv = div`
//   display: flex;
//   color: {...props => props.color}
// `

function InventoryDefault() {
  return (
    <>
      {/* <StyledDiv color="Red">

      </StyledDiv> */}
      <InventoryEmpty />
      {/* <AddButton /> */}
      <MenuBar />
    </>
  );
}

export default InventoryDefault;
