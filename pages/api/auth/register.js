"use strict";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import database from "middlewares/database";

const router = createRouter();

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //register customer
  .post(async (req, res) => {
    const { name, email, country, password, rePassword } = req.body;

    try {
      let account;
      try {
        account = await req.db.collection("customers").updateOne(
          {
            _id: email,
          },
          {
            $setOnInsert: {
              _id: email,
              name: name,
              country: country,
              password: bcrypt.hashSync(password, 8),
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.log(err);
      }
      console.log(account);
      if (account.upsertedId) {
        return res.status(200).json({ reason: "Registration successful!" });
      } else {
          return res.status(201).json({ reason: "Email already exist!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ reason: "server error" });
    }
  });

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
