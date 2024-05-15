// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withApiAuthRequired(async (req: NextRequest) => {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['read:microposts']
  });
  const response = await fetch('https://nfk13r40e6.execute-api.ap-northeast-1.amazonaws.com/api/auth0/microposts', {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    }
  });
  const microposts = await response.json();
  return NextResponse.json(microposts, res);
});

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['read:microposts']
  });
  await fetch('https://nfk13r40e6.execute-api.ap-northeast-1.amazonaws.com/api/auth0/microposts', {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(await req.json()),
  });
  return NextResponse.json(null, res);
});
