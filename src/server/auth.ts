import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '~/env';
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { db } from '~/server/db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ]
};

export const getServerAuthSession = () => getServerSession(authOptions);
