import React from "react";
import CredentialsForm from "./credentialsForm";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center w-1/3 p-10 shadow-md">
        <h1 className="mb-4 text-4xl font-bold">{"התחברות"}</h1>
        <CredentialsForm />
      </div>
    </div>
  );
}
