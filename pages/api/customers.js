"use strict";
import { createRouter } from "next-connect";
import database from "middlewares/database";

const { ObjectId } = require("mongodb");

const router = createRouter();

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //Retrieve orders
  .post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    console.log(session.user.email);
    if (session) {
      const { lastOrderId } = req.body;

      try {
        const orders = await req.db
          .collection("orders")
          .find(
            lastOrderId
              ? {
                  _id: { $lt: new ObjectId(lastOrderId) },
                  email: session.user.email,
                }
              : { email: session.user.email }
          )
          .sort({ _id: -1 })
          .limit(10)
          .toArray();
        //const emails =accounts.map(account=>account.email).toString()

        return res.status(200).json({ orders });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ reason: "server error" });
      }
    } else {
      // Not Signed in
      return res.status(401).json({ reason: "unauthenticated" });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
