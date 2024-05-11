import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Profile() {
  const session = await getSession();
  const user = session?.user
  return <div>Hello {user?.name}</div>;
}, { returnTo: '/profile' })
