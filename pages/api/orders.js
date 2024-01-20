"use strict";
import { createRouter, expressWrapper } from "next-connect";

import database from "middlewares/database";
const router = createRouter();

router
  // Use express middleware in next-connect with expressWrapper function
  //.use(expressWrapper(passport.session()))
  // A middleware example
  //.use(database)
  .use(async (req, res, next) => {
    const start = Date.now();
    await database(req, res, next);
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })

  .put(async (req, res) => {
    const { payPalDetails } = JSON.parse(req.body);

    try {
      let doc = await req.db.collection("products").insertOne(payPalDetails);
      console.log(doc);
      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, err: err });
    }
  });

//export const config = {
//  runtime: "edge",
//};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
