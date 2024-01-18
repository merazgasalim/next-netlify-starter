import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";

import Image from "next/image";
import { IoMdCheckboxOutline } from "react-icons/io";

export default function Hero() {
  return (
    <Container
      as={"header"}
      maxW="full"
      p={0}
      pos="relative"
      maxH={"100vh"}
      overflow="hidden"
      minH={{ base: "65vh", md: "100vh" }}
      bgImage="url(/images/hero.webp)"
      bgRepeat={"no-repeat"}
      bgPos="center"
      bgSize="cover"
    >
      <Box
        pos={"absolute"}
        top="0"
        w={"100%"}
        h="100%"
        bg="rgba(0,0,0,0.7)"
      ></Box>
      <Box
        pos={"absolute"}
        bottom={{ base: 0, md: 12, lg: 0 }}
        right={0}
        w={{ base: 120, md: 192 }}
      >
        <Image
          src="https://www.paypalobjects.com/webstatic/mktg/logo/bdg_now_accepting_pp_2line_w.png"
          border="0"
          alt="Now accepting PayPal"
          width={192}
          height={55}
        />
      </Box>
      <Flex
        pos={"absolute"}
        top={0}
        left={0}
        w="100%"
        h={"100%"}
        color="white"
        align="center"
        justify={"center"}
        textAlign="center"
      >
        <Box>
          <Heading
            as={"h1"}
            color="orange.400"
            fontSize={{ base: "2xl", md: "5xl", lg: "6xl" }}
            mb={5}
          >
            Get Your IPTV Subscription For Endless Entertainment
          </Heading>

          <Stack
            direction={{ base: "column", md: "row" }}
            fontWeight={"bold"}
            fontSize={{ base: "md", md: "xl" }}
            as={List}
            spacing={{ base: 0, md: 2 }}
            align={"flex-start"}
            justify={{ base: "flex-start", md: "center" }}
            alignItems={{ base: "flex-start", md: "center" }}
            px={{ base: 5, md: 0 }}
            textAlign="left"
          >
            <ListItem>
              <ListIcon
                as={IoMdCheckboxOutline}
                mr={0}
                w={7}
                h={7}
                color="green.50"
              />
              High Quality Video Streaming
            </ListItem>
            <ListItem>
              <ListIcon
                as={IoMdCheckboxOutline}
                mr={0}
                w={7}
                h={7}
                color="green.50"
              />
              Thousands of HD UHD 4K Channels{" "}
              <Text as={"span"} display={{ base: "none", md: "inline" }}>
                with EPG
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon
                as={IoMdCheckboxOutline}
                mr={0}
                w={7}
                h={7}
                color="green.50"
              />
              Thousands of HD UHD 4K VOD
            </ListItem>
            <ListItem>
              <ListIcon
                as={IoMdCheckboxOutline}
                mr={0}
                w={7}
                h={7}
                color="green.50"
              />
              24/7 Customer Support
            </ListItem>
          </Stack>
          <HStack pt={5} justify="center">
            <Button colorScheme={"pink"} size={{ base: "sm", md: "md" }}>
              Subscribe Now
            </Button>
            <Button
              colorScheme={"pink"}
              variant="outline"
              size={{ base: "sm", md: "md" }}
            >
              24 Hours Free Trial
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Container>
  );
}
