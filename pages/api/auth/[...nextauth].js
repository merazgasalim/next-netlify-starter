import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import clientPromise from "lib/mongoClient";
import { ObjectId } from "mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials.email);
        // Add logic to verify credentials here
        if (!credentials) return null;
        const MongoClient = await clientPromise;
        const user = await MongoClient.db()
          .collection("customers")
          .findOne({
            _id: new ObjectId(credentials.email),
          });
        console.log(user, "oo");
        // await clientPromise.then(async (MongoClient) => {
        //
        //   user = await MongoClient.db().collection("customers").findOne({
        //     _id: new ObjectId(credentials.email),
        //   });
        //   console.log(user, "oo");
        // });

        const { email, password } = credentials;
        // Fetch user and password hash from your database
        // Example: const user = await getUserByEmail(email)
        if (user && bcrypt.compareSync(password, user.passwordHash)) {
          return { id: user.id, name: user.name, email: user.email };
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
  },
};

export default NextAuth(authOptions);
