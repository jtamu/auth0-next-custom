'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(() => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [microposts, setMicroposts] = useState(Array<{content: string, postedAt: string}>);
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch(`${window.location.origin}/api/microposts`);
      if (res.status >= 300) {
        router.push("/api/auth/login");
      }
      setMicroposts(await res.json());
    })();
  }, [router]);

  async function postMicropost() {
    await fetch(`${window.location.origin}/api/microposts`, {
      method: 'POST',
      body: JSON.stringify({content: content}),
    });
    const res = await fetch(`${window.location.origin}/api/microposts`);
    setMicroposts(await res.json());
  }

  if (isLoading || !user) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <h1>投稿</h1>
      <div className="max-w-2xl my-5 mx-auto">
        {microposts.map((micropost, idx) => {
          return (
            <div key={idx}>
              <div className="border-b border-gray-300 py-2 flex items-center">
                <Image className="w-12 h-12 rounded-full mr-2" src={user.picture ?? ''} alt="facePicture" width={600} height={600} />
                <div className="flex-grow">
                    <h3 className="m-0 text-lg">{micropost.content}</h3>
                    <p className="my-1 text-sm text-gray-700">{user.name}</p>
                    <p className="my-1 text-sm text-gray-700">{dayjs(micropost.postedAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
              </div>
            </div>
          )
        })}
        <div className="py-2 flex items-center">
            <div className="flex-grow">
                <input className="inline-block w-[calc(100%-6em)] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 m-2"
                  type="text" onChange={(event) => setContent(event.target.value)} />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={postMicropost}>投稿</button>
            </div>
        </div>
      </div>
    </main>
  );
});
