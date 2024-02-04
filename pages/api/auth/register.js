"use strict";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
const crypto = require("crypto");
import database from "middlewares/database";

import { ResetPasswordSchema, SetNewPasswordSchema } from "lib/validators";

const router = createRouter();

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //Ask to reset password
  .get(async (req, res) => {
    try {
      const { email } = req.query;
      //Validate form
      const formValidation = ResetPasswordSchema.isValidSync({ email });
      if (!formValidation)
        return res.status(400).json({ reason: "Invalid email!" });

      //find customer
      const customer = await req.db
        .collection("customers")
        .findOne({ _id: email });

      if (!customer)
        return res
          .status(400)
          .json({ reason: "Customer with given email doesn't exist!" });

      //create temporar pawword reset TOKEN
      const token = crypto.randomBytes(32).toString("hex");
      console.log(token);

      //Save token to DB
      await req.db
        .collection("customers")
        .updateOne(
          { _id: email },
          { $set: { token: { data: token, time: new Date().getTime() } } }
        );

      //Create reset link
      const link = `${process.env.baseURL}/auth/reset-password?email=${email}&token=${token}`;
      console.log(link);
      //Send link via email

      return res
        .status(200)
        .json({ reason: "Password reset link sent to your email account!" });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ reason: "server error" });
    }
  })
  //reset Password
  .patch(async (req, res) => {
    try {
      const { password, rePassword, email, token } = req.body;
      console.log(password, rePassword, email, token);
      //Validate form
      const formValidation = SetNewPasswordSchema.isValidSync({
        password,
        rePassword,
      });
      if (!formValidation)
        return res.status(400).json({ reason: "Invalid password!" });

      //find customer
      const customer = await req.db
        .collection("customers")
        .findOne({ _id: email });

      if (
        !customer ||
        !customer.token ||
        customer.token.data !== token ||
        new Date().getTime() - customer.token.time > 1000 * 60 * 10 //10 minutes elapsed
      )
        return res.status(400).json({ reason: "Invalid link or expired!" });

      //Update password
      await req.db.collection("customers").updateOne(
        { _id: email },
        {
          $set: {
            token: null,
            password: bcrypt.hashSync(password, 8),
          },
        }
      );

      console.log(customer.token);
      return res.status(200).json({ reason: "Password reset sucessfully!" });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ reason: "server error" });
    }
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
