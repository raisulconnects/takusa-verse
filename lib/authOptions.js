import CredentialsProvider from "next-auth/providers/credentials";
import User from "../models/User";
import bcrypt from "bcrypt";
import connectDB from "./connectDB";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("--> authorize Inside Credentiuals Hit!");

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email }).lean();
          if (!user) {
            throw new Error("Invalid Email, Please Check and try again.");
          }

          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) {
            throw new Error("Invalid Password, Please check and try again.");
          }

          const { password, ...userWithOutPassword } = user;

          console.log(
            "--> From authOptions --> UserWithOutPassword:",
            userWithOutPassword
          );

          return userWithOutPassword;
        } catch (e) {
          console.error(e.message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("callback -> jwt executing...");

      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.checkingToken =
          "here is a check to see if this reaches lol TOKEN";
      }

      return token;
    },

    async session({ session, token }) {
      console.log("callback -> session executing...");

      session.user = session.user || {};
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.checkingSession =
        "here is a check to see if this reaches lol SESSION";

      return session;
    },

    async signIn({}) {
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
