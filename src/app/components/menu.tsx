"use client";

import React, { useState } from "react";
import Backdrop from "./backdrop";

interface MenuProps {
  triggerElement: (handleClickOpen: () => void) => JSX.Element;
  className?: string;
  renderChildren: (handleClose: () => void) => JSX.Element; // renderProps function, allowed to pass props to the children component
}

const Menu: React.FC<MenuProps> = ({
  triggerElement,
  renderChildren,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {triggerElement(() => {
        setOpen(true);
      })}
      {!!open && (
        // TODO: Add animation
        <Backdrop onClose={handleClose}>
          <div
            className={`absolute right-0 h-screen w-fit bg-white p-7 shadow-xl ${className}`}
            onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              ev.stopPropagation();
            }}
          >
            {renderChildren(handleClose)}
          </div>
        </Backdrop>
      )}
    </>
  );
};

export default Menu;
