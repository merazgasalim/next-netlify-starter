"use strict";
import { createRouter } from "next-connect";
const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
import payPalClient from "lib/payPalClient";
import bcrypt from "bcrypt";
import database from "middlewares/database";
import { Offers, Trial } from "lib/constants";
import { transporter } from "lib/nodemailer";
import WelcomeEmail from "components/emails/WelcomeEmail";
import WelcomeBackEmail from "components/emails/WelcomeBackEmail";
import ReceiptEmail from "components/emails/ReceiptEmail";
import SubscriptionEmail from "@components/emails/SubscriptionEmail";
import { render } from "@react-email/render";
//const { ObjectId } = require("mongodb");
import { ObjectId } from "mongodb";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const router = createRouter();

const ContactEmail = process.env.supportMail;

router
  .use(async (req, res, next) => {
    await database(req, res, next);
    await next();
  })
  //Retrieve all orders
  .post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    console.log(info);

    if (
      session &&
      (session.user.email === process.env.ADMIN1 ||
        session.user.email === process.env.ADMIN2)
    ) {
      const { lastOrderId } = req.body;

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
    } else {
      // Not Signed in
      return res.status(401).json({ reason: "unauthenticated" });
    }
  })
  //Add order
  .put(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    const { paypal } = JSON.parse(req.body);
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
          return res.status(404).json({
            success: false,
            reason: `Your payment is ${order.result.status}. Please contact us -- ${ContactEmail}`,
          });
      } catch (err) {
        console.error(err);
        return res.status(404).json({
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
        selectedPlan?.price !==
        paypal.purchase_units[0].amount.breakdown.item_total.value
      ) {
        //Check if Trial
        if (
          paypal.purchase_units[0].description.replace(
            " IPTV Subscription",
            ""
          ) !== Trial.duration &&
          paypal.purchase_units[0].amount.breakdown.item_total.value !==
            Trial.price
        )
          return res.status(404).json({
            success: false,
            reason: `Your Order ID : ${orderID} is under review!,  Please contact us -- ${ContactEmail}`,
          });
      }

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
        return res.status(404).json({
          success: false,
          reason: `Something went wrong, Please contact us with your Order ID : ${orderID} -- ${ContactEmail}`,
        });
      }

      //4. Create account for customer if it doesn't exist
      let account;
      try {
        account = await req.db.collection("customers").updateOne(
          {
            _id: paypal.email,
          },
          {
            $setOnInsert: {
              _id: paypal.email,
              name: paypal.name,
              country: paypal.country,
              password: bcrypt.hashSync(paypal.password, 8),
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.log(err);
      }

      //5. Send email

      if (process.env.NODE_ENV === "production") {
        try {
          //Send Welcome Email for new user
          if (!session) {
            if (account.upsertedId) {
              const result = await transporter.sendMail({
                to: paypal.email,
                from: "no-reply@tvstreams.net",
                subject: "Welcome to TV STREAMS!",

                html: render(
                  WelcomeEmail({
                    userFirstname: paypal.name.split(" ")[0],
                  })
                ),
              });
              const failed = result.rejected
                .concat(result.pending)
                .filter(Boolean);
              if (failed.length) {
                console.log(
                  `Email(s) (${failed.join(", ")}) could not be sent`
                );
                return res.status(400).json({
                  reason: `Email(s) (${failed.join(", ")}) could not be sent`,
                });
              }
            } else {
              // Send reminder of existing account
              const result = await transporter.sendMail({
                to: paypal.email,
                from: "no-reply@tvstreams.net",
                subject: "Welcome to TV STREAMS!",

                html: render(
                  WelcomeBackEmail({
                    userFirstname: paypal.name.split(" ")[0],
                  })
                ),
              });
              const failed = result.rejected
                .concat(result.pending)
                .filter(Boolean);
              if (failed.length) {
                console.log(
                  `Email(s) (${failed.join(", ")}) could not be sent`
                );
                return res.status(400).json({
                  reason: `Email(s) (${failed.join(", ")}) could not be sent`,
                });
              }
            }
          }
          console.log(paypal);
          //Send order confirmation email
          const result = await transporter.sendMail({
            to: paypal.email,
            from: process.env.EMAIL_FROM_ORDERS,
            subject: "Welcome to TV STREAMS!",
            html: render(
              ReceiptEmail({
                orderID: orderID,
                orderDate: new Date(paypal.create_time).toLocaleString(),
                userName: `${paypal.payer.name.given_name} ${paypal.payer.name.surname}`,
                subscription: paypal.purchase_units[0].description,
                price: paypal.purchase_units[0].amount.value,
              })
            ),
          });
          const failed = result.rejected.concat(result.pending).filter(Boolean);
          if (failed.length) {
            console.log(`Email(s) (${failed.join(", ")}) could not be sent`);
            return res.status(400).json({
              reason: `Email(s) (${failed.join(", ")}) could not be sent`,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
      return res.status(200).json({
        success: true,
        accountCreated: session ? true : account.upsertedId,
      });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ success: false, err: err });
    }
  })
  //Update order
  .patch(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (
      session &&
      (session.user.email === process.env.ADMIN1 ||
        session.user.email === process.env.ADMIN2)
    ) {
      const { orderId, action, subscriptionDetails } = req.body;
      console.log(subscriptionDetails);
      try {
        switch (action) {
          case "Delete":
            await req.db
              .collection("orders")
              .deleteOne({ _id: new ObjectId(orderId) });
            return res.status(200).json({ reason: "success" });
          case "Approve":
            await req.db
              .collection("orders")
              .updateOne(
                { _id: new ObjectId(orderId) },
                { $set: { stutus: "Delivered" } }
              );
            //Send Email
            const result = await transporter.sendMail({
              to: paypal.email,
              from: "no-reply@tvstreams.net",
              subject: "Welcome to TV STREAMS!",

              html: render(
                SubscriptionEmail({
                  userFirstname: paypal.name.split(" ")[0],
                })
              ),
            });

            const failed = result.rejected
              .concat(result.pending)
              .filter(Boolean);
            if (failed.length) {
              console.log(`Email(s) (${failed.join(", ")}) could not be sent`);
              return res.status(400).json({
                reason: `Email(s) (${failed.join(", ")}) could not be sent`,
              });
            }

            return res.status(200).json({ reason: "success" });
          case "Ban":
            await req.db
              .collection("orders")
              .updateOne(
                { _id: new ObjectId(orderId) },
                { $set: { stutus: "Banned" } }
              );
            return res.status(200).json({ reason: "success" });
          default:
            return res.status(404).json({ reason: "unauthorized" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ reason: "server error" });
      }
    } else {
      // Not Signed in
      return res.status(401).json({ reason: "unauthenticated" });
    }
  });
// Get user subscriptions
//  .get(async (req, res) => {
//    const { customerEmail } = req.query;
//    console.log(lastOrderId);
//    try {
//      const subscriptions = await req.db
//        .collection("orders")
//        .findMany({ email: customerEmail });
//
//      return res.status(200).json({ subscriptions });
//    } catch (err) {
//      console.log(err);
//      return res.status(404).json({ reason: "server error" });
//    }
//  });

//export const config = {
//  runtime: "edge",
//};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    return res.status(err.statusCode || 500).end(err.message);
  },
});
