import axios from "axios";
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
        const response = await axios.get(`${baseUrl}/auth0/microposts`, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            }
        });
        return response.data;
    }

    const post = async (accessToken: string|undefined, reqJson: any) => {
        await axios.post(`${baseUrl}/auth0/microposts`, reqJson, {
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
        });
    }

    return {ping, getAll, post}
}
