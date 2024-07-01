export default function MicropostService(baseUrl: string) {
    const ping = async (): Promise<{message: string}> => {
        const res = await fetch(`${baseUrl}/ping`, {
            headers: {
              "Content-Type": "application/json",
            }
        });
        return res.json();
    }
    return {ping}
}