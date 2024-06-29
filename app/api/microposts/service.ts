export default function MicropostService(baseUrl: string) {
    const ping = async () => {
        const res = await fetch(`${baseUrl}/ping`, {
            headers: {
              "Content-Type": "application/json",
            }
        });
        return res.json();
    }
    return {ping}
}