import { Container, Heading, Text, Link } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { minH } from "lib/constants";

export default function RefundPolicy() {
  return (
    <>
    <NextSeo title="Calcelation Policy" description="Calcelation Policy" />
    <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
      <Heading as={"h1"} mb={5}>
        Cancelation Policy
      </Heading>
      <Text fontSize={"lg"} mb={2} fontWeight="bold">
        How can I cancel an order?
      </Text>
      <Text mb={5}>
        You’ll have the option to cancel your order directly from your
        confirmation email within 1 hour. Scroll down to find the “Changed Your
        Mind?” section. If it’s been longer than 60 minutes, email{" "}
        <Link href={`mailto:${process.env.supportMail}`} color="teal">
          {process.env.supportMail}
        </Link>{" "}
        and we’ll help find an alternative solution.
      </Text>
      <Text fontSize={"lg"} mb={2} fontWeight="bold">
        I accidentally canceled my order, can I resume it?
      </Text>
      <Text mb={5}>
        If you’ve canceled your order on site and want to receive your order
        after all, the best way to do so is by placing a new order at checkout.
        Email{" "}
        <Link href={`mailto:${process.env.supportMail}`} color="teal">
          {process.env.supportMail}
        </Link>{" "}
        if you have any questions — we’re here to help.
      </Text>
      <Text fontSize={"lg"} mb={2} fontWeight="bold">
        I canceled my order, but I’m not sure it went through. Can you confirm
        it has been canceled?
      </Text>
      <Text mb={5}>
        If you’ve canceled your order using the link in your order confirmation
        email, you’ll receive another email once the order has successfully been
        canceled. If you haven’t received a cancellation confirmation email, let
        us know at{" "}
        <Link href={`mailto:${process.env.supportMail}`} color="teal">
          {process.env.supportMail}
        </Link>{" "}
        (and include your original #GLO order number) and we’ll take a look!
      </Text>
      <Text fontSize={"lg"} mb={2} fontWeight="bold">
        I don’t see the option to self-cancel! How can I cancel my order?
      </Text>
      <Text>
        If you’ve placed an order contains a gift card, please email{" "}
        <Link href={`mailto:${process.env.supportMail}`} color="teal">
          {process.env.supportMail}
        </Link>{" "}
        as soon as possible (including your # order number and cancel/change
        request) and we can help.f
      </Text>
    </Container></>
  );
}
