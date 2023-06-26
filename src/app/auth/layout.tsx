import React from "react";
import HeaderNav from "./headerNav";
import Image from "next/image";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex justify-center bg-slate-600 shadow-lg ">
        <div className="container flex justify-between px-6 py-3">
          <Image src="/favicon.ico" width={24} height={24} alt="logo" />
          <HeaderNav />
        </div>
      </header>
      <main className="w-full flex-grow flex justify-center p-6">
        {children}
      </main>
    </div>
  );
}
