import { signIn as nextAuthSignIn } from "next-auth/react";

export const signIn = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const dbUser = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (dbUser) {
      const res = await nextAuthSignIn("credentials", { email, password });
      return res;
    } else {
      throw Error("User not found");
    }
  } catch (error) {}
};
