import React from "react";
import HeaderNav from "./headerNav";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/auth");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full flex justify-center bg-slate-600 shadow-lg ">
        <div className="container flex justify-between px-6 py-3">
          <div>Logo</div>
          <HeaderNav />
        </div>
      </header>
      <main className="w-full flex-grow flex justify-center">{children}</main>
    </div>
  );
}
