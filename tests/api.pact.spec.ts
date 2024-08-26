import MicropostService from "@/app/api/microposts/service";
import { MatchersV3, PactV3 } from "@pact-foundation/pact";
import path from "path";

const {eachLike, string, regex, timestamp} = MatchersV3;

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

describe('GET /auth0/microposts', () => {
    it('micropostsを返すこと', async () => {
        provider.addInteraction({
            states: [{description: 'ユーザの投稿が存在する場合'}],
            uponReceiving: 'ユーザの全ての投稿をリクエストする',
            withRequest: {
                method: 'GET',
                path: '/auth0/microposts',
                // 実際はAuthorizationヘッダにBearerトークンを含める必要がある
            },
            willRespondWith: {
                status: 200,
                headers: {'Content-Type': 'application/json'},
                body: eachLike({
                    content: string('Hello, World.'),
                    postedAt: timestamp('YYYY-MM-DD HH:mm:ss', '2024-08-21 23:01:01'),
                })
            }
        });

        await provider.executeTest(async (mockserver) => {
            const service = MicropostService(mockserver.url);
            const response = await service.getAll('hoge');
            expect(JSON.stringify(response)).toStrictEqual(
                JSON.stringify([{content: 'Hello, World.', postedAt: '2024-08-21 23:01:01'}])
            );
        })
    });
})
