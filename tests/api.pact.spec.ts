import MicropostService from "@/app/api/microposts/service";
import { MatchersV3, PactV3 } from "@pact-foundation/pact";
import path from "path";

const provider = new PactV3({
    dir: path.resolve(process.cwd(), 'pacts'),
    consumer: 'auth0-next-custom',
    provider: 'google-login-back'
});

describe('GET /ping', () => {
    it('200レスポンス(pong)を返すこと', async () => {
        provider.addInteraction({
            states: [{description: 'pongレスポンスに成功する場合'}],
            uponReceiving: 'pingリクエストを送信する',
            withRequest: {
                method: 'GET',
                path: '/ping',
            },
            willRespondWith: {
                status: 200,
                headers: {'Content-Type': 'application/json'},
                body: MatchersV3.equal({message: 'pong'}),
            }
        });

        await provider.executeTest(async (mockserver) => {
            const service = MicropostService(mockserver.url);
            const response = await service.ping();
            expect(response.message).toStrictEqual('pong');
        })
    })
});
