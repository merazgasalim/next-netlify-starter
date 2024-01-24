import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logo.png";

export default function LargeWithLogoLeft() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box as={Link} href="/" maxW={150}>
              <Image src={Logo} alt="TV Streams" />
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href={"/legal/privacy-policy"}>Privacy Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href={"/legal/cancelation-policy"}>Cancelation Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href={"/legal/terms-of-service"}>Terms of service</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Link href={"/legal/cookies-policy"}>Cookie Policy</Link>
          </Stack>
        </SimpleGrid>

        <Image
          src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
          alt="PayPal Acceptance Mark"
          width={300}
          height={103.5}
          style={{margin:"0 auto"}}
          
        />

        <Text fontSize={"sm"} textAlign="center">
          © {new Date().getFullYear()} {process.env.companyName}. All rights
          reserved
        </Text>
      </Container>
    </Box>
  );
}
