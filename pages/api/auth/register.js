"use strict";
import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import database from "middlewares/database";

const { ObjectId } = require("mongodb");

const router = createRouter();

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //register customer
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      await req.db
        .collection("customers")
        .insertOne({ _id: email, password: bcrypt.hashSync(password, 8) });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ reason: "server error" });
    }
  });
