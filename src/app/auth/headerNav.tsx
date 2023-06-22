"use client";

import Link from "next/link";
import React, { useState } from "react";
import Menu from "../components/menu";
import { SlMenu } from "react-icons/sl";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Menu
      className="px-0"
      triggerElement={(handleClickOpen) => (
        <button onClick={handleClickOpen}>
          <SlMenu />
        </button>
      )}
      renderChildren={(handleClose) => (
        <nav>
          <ul className="flex flex-col text-center">
            <Link
              className="hover:shadow-md hover:bg-zinc-100 px-6 py-1 text-gray-500"
              onClick={handleClose}
              href={`/`}
            >
              {"בית"}
            </Link>
            <Link
              className="hover:shadow-md hover:bg-zinc-100 px-6 py-1 text-gray-500"
              onClick={handleClose}
              href={`/auth/add-game`}
            >
              {"צור משחק"}
            </Link>
            <button
              className="hover:shadow-md hover:bg-zinc-100 px-6 py-1 text-gray-500"
              onClick={() => {
                signOut();
                redirect("/");
              }}
            >
              {"התנתקות"}
            </button>
          </ul>
        </nav>
      )}
    />
  );
}
