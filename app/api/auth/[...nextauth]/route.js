// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import User from '@/Model/User';
import connectToDatabase from '@/lib/data';

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();
      try {
        let dbUser = await User.findOne({ githubId: account.providerAccountId });
        if (!dbUser) {
          dbUser = await User.create({
            githubId: account.providerAccountId,
            username: profile.login || user.name || 'guest',
            email: user.email,
            bio: '',
          });
        }
        return true;
      } catch (error) {
        console.error('Sign-in error:', error);
        return false;
      }
    },
    async session({ session }) {
      await connectToDatabase();
      try {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.username = dbUser.username;
          session.user.bio = dbUser.bio || '';
        }
        return session;
      } catch (error) {
        console.error('Session error:', error);
        return session; // Fallback to avoid breaking
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };