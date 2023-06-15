import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-5">
      <h1 className="text-xl">{"משחקים יחד"}</h1>
      <Link href={`/login`}>{"ליצירת או הפעלת משחק התחבר"}</Link>
      <Link href={`/auth`}>{"צור משחק"}</Link>
    </main>
  );
}
