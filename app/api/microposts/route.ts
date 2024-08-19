// pages/api/products.js
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from 'next/server';
import MicropostService from './service';

export const GET = withApiAuthRequired(async (req: NextRequest) => {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['read:microposts']
  });
  const service = MicropostService("https://nfk13r40e6.execute-api.ap-northeast-1.amazonaws.com/api")
  const microposts = await service.getAll(accessToken);
  return NextResponse.json(microposts, res);
});

export const POST = withApiAuthRequired(async (req: NextRequest) => {
  // If your access token is expired and you have a refresh token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  const res = new NextResponse();
  const { accessToken } = await getAccessToken(req, res, {
    scopes: ['read:microposts']
  });
  const service = MicropostService("https://nfk13r40e6.execute-api.ap-northeast-1.amazonaws.com/api")
  await service.post(accessToken, req)
  return NextResponse.json(null, res);
});
