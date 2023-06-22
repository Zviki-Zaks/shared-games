import Link from "next/link";
import { FaPlay } from "react-icons/fa";

export default function UserPage() {
  return (
    <ul className="flex flex-col gap-6">
      <li>
        <Link
          href="/auth/add-game"
          className="flex flex-row-reverse items-center gap-6 justify-between px-6 py-2 rounded-full bg-pink-300 text-white hover:bg-pink-400"
        >
          <span className="block text-3xl">{"צור משחק חדש"}</span>
          <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center">
            <FaPlay className="pl-1 h-4 w-4 text-pink-300 transform rotate-180" />
          </span>
        </Link>
      </li>
      <li>
        <Link
          href="/auth/games"
          className="flex flex-row-reverse items-center gap-6 justify-between px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <span className="block text-3xl">{"נהל משחקים"}</span>
          <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center ">
            <FaPlay className="pl-1 h-4 w-4 transform rotate-180 text-blue-600" />
          </span>
        </Link>
      </li>
    </ul>
  );
}
