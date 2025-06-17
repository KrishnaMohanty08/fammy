// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import User from '@/Model/User';
import connectToDatabase from '@/lib/data';

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ githubId: account.providerAccountId });
      if (!existingUser) {
        await User.create({
          githubId: account.providerAccountId,
          username: profile.login || user.name || 'guest',
          email: user.email,
        });
      }
      return true;
    },
    async session({ session }) {
      await connectToDatabase();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.username = dbUser.username;
        session.user.bio = dbUser.bio;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // REQUIRED
};

const handler = NextAuth(authOptions);

// ✅ THIS IS THE CORRECT WAY:
export const { GET, POST } = handler;
