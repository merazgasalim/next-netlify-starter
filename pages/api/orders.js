"use strict";
import { createRouter } from "next-connect";
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
import payPalClient from "lib/payPalClient";

import database from "middlewares/database";
import { Offers } from "lib/constants";
const { ObjectId } = require("mongodb");

const router = createRouter();

const ContactEmail = process.env.supportMail;

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //Retrieve orders
  .post(async (req, res) => {
    const { lastOrderId } = req.body;
    console.log(lastOrderId)
    try {
      const orders = await req.db
        .collection("orders")
        .find(lastOrderId ? { _id: { $lt: new ObjectId(lastOrderId) } } : {})
        .sort({ _id: -1 })
        .limit(10)
        .toArray();
      //const emails =accounts.map(account=>account.email).toString()

      return res.status(200).json({ orders });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ reason: "server error" });
    }
  })
  //Add order
  .put(async (req, res) => {
    const { paypal } = JSON.parse(req.body);
    //console.log(paypal.purchase_units);

    try {
      //PayPal order id
      const orderID = paypal.id;

      const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

      //1.Check PayPal payment status --> Should be approved or completed
      let order;
      try {
        order = await payPalClient.client().execute(request);
        let orderAccepted =
          process.env.NODE_ENV === "production" ? "COMPLETED" : "APPROVED";
        if (order.result.status !== orderAccepted)
          return res.json({
            success: false,
            reason: `Your payment is ${order.result.status}. Please contact us -- ${ContactEmail}`,
          });
      } catch (err) {
        console.error(err);
        return res.json({
          success: false,
          reason: `Our server couldn't communicate with PayPal, Please contact us with your Order ID : ${orderID} -- ${ContactEmail}`,
        });
      }

      //2.Validate the transaction details are as expected
      const selectedPlan = Offers.find(
        (offer) =>
          offer.duration ===
          paypal.purchase_units[0].description.replace(" IPTV Subscription", "")
      );

      if (
        selectedPlan.price !==
        paypal.purchase_units[0].amount.breakdown.item_total.value
      )
        return res.json({
          success: false,
          reason: `Your Order ID : ${orderID} is under review!,  Please contact us -- ${ContactEmail}`,
        });

      //3. Save the transaction in your database
      //If same order id then it will be rejected --> same database id
      try {
        await req.db.collection("orders").insertOne({
          //id: orderID, //PayPal Order ID
          ...paypal,
          stutus: "Pending",
          date: new Date().getTime(),
        });
      } catch (err) {
        return res.json({
          success: false,
          reason: `Something went wrong, Please contact us with your Order ID : ${orderID} -- ${ContactEmail}`,
        });
      }

      //4. Send email
      //let doc = await req.db.collection("orders").insertOne(paypal);
      // console.log(doc);
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
