import { Container, Heading, Progress, Text } from "@chakra-ui/react";
import { minH } from "lib/constants";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

import MyOrders from "@components/customer/MyOrders";

export default function MyAccount() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      <NextSeo title="My Account" description="My Account" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <Heading as={"h1"} fontSize="2xl">
          Welcome {session.user.name} !
        </Heading>
        <Text>
          {session.user.email} - ({session.user.image}).
        </Text>
        <MyOrders />
      </Container>
    </>
  );
}

MyAccount.auth = {
  role: "customer",
  loading: <Progress size="xs" isIndeterminate />,
  unauthorized: "/auth/signin", // redirect to this url
};
