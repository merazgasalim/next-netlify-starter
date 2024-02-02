import { useRouter } from "next/router";
import { Button, Center, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

export default function Error() {
  const Router = useRouter();
  const signin = () => {
    Router.push(`/auth/signin?callbackUrl=${window.location.href}`);
  };
  return (
    <>
      <NextSeo
        title="Sign in Error"
        description="Sign in Error"
        nofollow
        noindex
      />
      <Center
        as={"main"}
        p={8}
        style={{ minHeight: "calc(100vh - 335px)" }}
        dir={Router.locale === "ar" ? "rtl" : "ltr"}
      >
        <Stack spacing={2} align={"center"} maxW={"md"} w={"full"}>
          <Heading as={"h1"} fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
            Unable to sign in
          </Heading>
          {Router.query.error === "Verification" ? (
            <>
              <Text>The sign in link is no longer valid.</Text>
              <Text>It may have been used already or it may have expired.</Text>
              <Button onClick={signin} colorScheme="telegram">
                The sign in link is no longer valid.
              </Button>
            </>
          ) : Router.query.error === "Configuration" ? (
            <>
              <Text> Something went wrong at our end.</Text>
              <Text>If the issue persists please contact us at:</Text>
              <Link href={`mailto:${process.env.supportMail}`} color="teal">
                {process.env.supportMail}
              </Link>
            </>
          ) : Router.query.error === "AccessDenied" ? (
            <>
              <Text>Access Denied</Text>
              <Text>
                If you believe that something is wrong then please contact us
                at:
              </Text>
              <Link href={`mailto:${process.env.supportMail}`} color="teal">
                {process.env.supportMail}
              </Link>
            </>
          ) : (
            <>
              <Text>Something went wrong :( </Text>
              <Text>If the issue persists please contact us at:</Text>
              <Link href={`mailto:${process.env.supportMail}`} color="teal">
                {process.env.supportMail}
              </Link>
            </>
          )}
        </Stack>
      </Center>
    </>
  );
}
