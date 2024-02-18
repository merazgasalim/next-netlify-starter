"use strict";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
//const crypto = require("crypto");
import crypto from "crypto"
import { render } from "@react-email/render";
import database from "middlewares/database";
import { transporter } from "lib/nodemailer";
import { ResetPasswordSchema, SetNewPasswordSchema } from "lib/validators";

import { ResetPasswordEmail } from "components/emails/ResetPasswordEmail";

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

      //create temporar password reset TOKEN
      const token = crypto.randomBytes(32).toString("hex");

      //Save token to DB
      await req.db
        .collection("customers")
        .updateOne(
          { _id: email },
          { $set: { token: { data: token, time: new Date().getTime() } } }
        );

      //Create reset link
      const link = `${process.env.baseURL}/auth/reset-password?email=${email}&token=${token}`;

      //Send link via email
      const result = await transporter.sendMail({
        to: email,
        from: "no-reply@tvstreams.net",
        subject: "Reset your TV STREAMS Password",

        html: render(
          ResetPasswordEmail({
            userFirstname: customer.name.split(" ")[0],
            resetPasswordLink: link,
          })
        ),
      });
      const failed = result.rejected.concat(result.pending).filter(Boolean);
      if (failed.length) {
        console.log(`Email(s) (${failed.join(", ")}) could not be sent`);
        return res
          .status(400)
          .json({
            reason: `Email(s) (${failed.join(", ")}) could not be sent`,
          });
      }

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
        new Date().getTime() - customer.token.time > 1000 * 60 * 15 //15 minutes elapsed
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
