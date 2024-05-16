import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withApiAuthRequired(async (req: NextRequest) => {
    const res = new NextResponse();
    const session = await getSession();

    // Management APIにアクセスするためのトークンを取得(クライアントクレデンシャルフロー)
    const tokenRes = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE,
            grant_type: 'client_credentials',
        })
    });
    const tokenResJson = await tokenRes.json();
    const accessToken = tokenResJson.access_token;

    await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session?.user.sub}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: 'PATCH',
      body: JSON.stringify(await req.json()),
    });
    return NextResponse.json(null, res);
  });
