import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

import { getAllUsers } from '../../../helpers/api-util';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'user@user.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        const allUsers = await getAllUsers();
        const user = allUsers.find(user => user.email === email);

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: 'test',
  jwt: {
    secret: 'test',
    encryption: true,
  },
});
