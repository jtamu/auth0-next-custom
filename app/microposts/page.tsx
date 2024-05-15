'use client';

import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

export default withPageAuthRequired(() => {
  const [microposts, setMicroposts] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${window.location.origin}/api/microposts`);
      setMicroposts(await res.json());
    })();
  }, []);

  async function postMicropost() {
    await fetch(`${window.location.origin}/api/microposts`, {
      method: 'POST',
      body: JSON.stringify({content: 'foo'}),
    });
    const res = await fetch(`${window.location.origin}/api/microposts`);
    setMicroposts(await res.json());
  }

  return (
    <main>
      <h1>Microposts (fetched from API)</h1>
      <pre data-testid="microposts-api">{JSON.stringify(microposts, null, 2)}</pre>
      <button onClick={postMicropost}>post</button>
    </main>
  );
});
