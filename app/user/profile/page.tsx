'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();

  const { user, error, isLoading, checkSession } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
  }, [user]);

  async function updateProfile() {
    await fetch(`${window.location.origin}/api/users`, {
      method: 'PATCH',
      body: JSON.stringify({'name': name, 'email': email}),
    });
    // sessionを更新する
    checkSession();
    router.push('/');
  }

  if (isLoading || !user) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="p-6 rounded-lg shadow-lg w-full">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          ユーザ名
        </label>
        <input id="username" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          メールアドレス
        </label>
        <input id="email" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex items-center justify-between">
        <button id="save-btn" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button" onClick={updateProfile}>
          保存
        </button>
      </div>
    </div>
  );
}
