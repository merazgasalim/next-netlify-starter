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
    const { email, password ,rePassword} = req.body;
  
    try {
      await req.db
        .collection("customers")
        .insertOne({ _id: email, password: bcrypt.hashSync(password, 8) });
        return res.status(200).json({ reason: "Registration successful!" });
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