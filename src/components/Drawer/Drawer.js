import React, { useEffect } from "react";

import MuiDrawer from "@mui/material/Drawer";

function Drawer(props) {
  // internal state if parent doesn't control the drawer
  const [internalOpen, setInternalOpen] = React.useState(false);

  // prefer external `open` prop if given, otherwise use internal
  const isOpen = props.open !== undefined ? props.open : internalOpen;

  const toggleDrawer = (open) => (event) => {
    if (
      event?.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // call external handler if available
    if (props.onClose) {
      props.onClose();
    } else {
      setInternalOpen(open);
    }
  };

  return (
    <MuiDrawer
      anchor={props.anchor || "bottom"}
      open={isOpen}
      onClose={toggleDrawer(false)}
    >
      {props.children}
    </MuiDrawer>
  );
}

export default Drawer;
