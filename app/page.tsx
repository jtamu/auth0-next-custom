import Link from "next/link";
import ProfileClient from "./components/user";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  const user = session?.user

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user && <a href="/api/auth/login" className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">ログイン</a>}
      {user && <a href="/api/auth/logout" className="inline-block bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 border border-gray-300 rounded shadow">ログアウト</a>}
      <ProfileClient />
      {user && <Link href="/user/profile" className="text-blue-500 hover:text-blue-700 hover:underline">プロフィール</Link>}
      {user && <Link href="/microposts" className="text-blue-500 hover:text-blue-700 hover:underline">投稿</Link>}
      Hello World
    </main>
  );
}
