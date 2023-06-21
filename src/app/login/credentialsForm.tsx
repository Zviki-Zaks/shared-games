"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";

const postNewUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const signInResponse = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      cache: "no-store",
    });
    // console.log("signInResponse", signInResponse);
    if (signInResponse.ok) {
      const user = await signInResponse.json();
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export default function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString();
    const password = data.get("password")?.toString();
    if (!email || !password) {
      return setError("אנא מלא את כל השדות");
    }
    if (isNewUser) {
      const name = data.get("name")?.toString();
      if (!name) {
        return setError("אנא מלא את כל השדות");
      }
      const res = await postNewUser({
        name,
        email,
        password,
      });
      if (!res) {
        return setError("ההרשמה נכשלה");
      }
    }
    const signInResponse = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push(`/auth`);
    } else {
      setError("אימייל או סיסמה לא מתאימים");
    }
    // }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1" dir="rtl">
      {!!isNewUser && (
        <>
          <label htmlFor="name" className="block font-bold">
            {"שם"}
          </label>
          <input
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
            type="text"
            name="name"
            id="name"
            placeholder="שם"
          />
        </>
      )}
      <label htmlFor="email" className="block font-bold">
        {"אימייל"}
      </label>
      <input
        className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
        type="email"
        name="email"
        id="email"
        placeholder="example@example.com"
      />
      <label htmlFor="password" className="block font-bold">
        {"סיסמה"}
      </label>
      <input
        className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-gray-600"
        type="password"
        name="password"
        id="password"
        placeholder="הכנס סיסמה"
      />
      {!!error && <span className="py-2 px-4 rounded bg-red-500">{error}</span>}
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4"
      >
        {"התחבר"}
      </button>
      <button
        className="text-sm text-gray-500 underline"
        onClick={(ev) => {
          ev.preventDefault();
          setIsNewUser(!isNewUser);
        }}
      >
        {isNewUser ? "יש לך חשבון? היכנס" : "אין לך חשבון? הרשם"}
      </button>{" "}
    </form>
  );
}
