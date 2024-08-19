import { NextRequest } from "next/server";

export default function MicropostService(baseUrl: string) {
    const ping = async (): Promise<{message: string}> => {
        const res = await fetch(`${baseUrl}/ping`, {
            headers: {
              "Content-Type": "application/json",
            }
        });
        return res.json();
    }

    const getAll = async (accessToken: string|undefined): Promise<Array<{content: string, postedAt: string}>> => {
        const response = await fetch(`${baseUrl}/auth0/microposts`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            }
        });
        return response.json();
    }

    const post = async (accessToken: string|undefined, req: NextRequest) => {
        console.log("new post")
        await fetch(`${baseUrl}/auth0/microposts`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(await req.json()),
        });
    }

    return {ping, getAll, post}
}
