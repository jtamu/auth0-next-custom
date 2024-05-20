import { handleAuth, handleLogin, handleProfile } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  profile: handleProfile({refetch: true}),
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: process.env.AUTH0_SCOPE // or AUTH0_SCOPE
    }
  })
});
