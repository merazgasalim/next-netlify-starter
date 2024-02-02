import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import clientPromise from "lib/mongoClient";
import { transporter } from "lib/nodemailer";

import welcomeEmail from "lib/welcomeEmail";

export const authOptions = {
  //adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic to verify credentials here
        if (!credentials) return null;
        const { email, password } = credentials;

        // Fetch user and password hash from your database
        const MongoClient = await clientPromise;
        const user = await MongoClient.db(process.env.DB_NAME)
          .collection("customers")
          .findOne({
            _id: email,
          });

        if (user && bcrypt.compareSync(password, user.password)) {
          return { email: user._id, name: user.name, image: user.country };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  jwt: {
    // JWT encoding and decoding configurations
  },
  callbacks: {
    // signIn, session callbacks
  },
  pages: {
    signIn: "/auth/signIn", // Custom sign-in page
    error: '/auth/error'
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
