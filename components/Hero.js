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
  useColorMode,
} from "@chakra-ui/react";

import Image from "next/image";

import HeroImage from "../public/images/hero.jpg";
import { IoMdCheckboxOutline } from "react-icons/io";

export default function Hero() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container
      as={"header"}
      maxW="full"
      p={0}
      pos="relative"
      maxH={"100vh"}
      overflow="hidden"
      minH={{base:"50vh",md:"auto"}}
    >
      <Image src={HeroImage} alt="" priority={true} />
      <Box
        pos={"absolute"}
        top="0"
        w={"100%"}
        h="100%"
        bg="rgba(0,0,0,0.7)"
      ></Box>
      <Flex
        pos={"absolute"}
        top={{base:"66px",md:0}}
        left={0}
        w="100%"
        h={"100%"}
        color="white"
        align="center"
        justify={"center"}
        textAlign="center"
      >
        <Box pl={5}>
          <Heading
            as={"h1"}
            color="orange.400"
            fontSize={{ base: "lg", md: "5xl" }}
          >
            Get Your IPTV Subscription For Endless Entertainment
          </Heading>

          <Stack
            direction={{ base: "column", md: "row" }}
            fontWeight={"bold"}
            fontSize={{ base: "md", md: "xl" }}
            as={List}
            spacing={{base:0,md:5}}
            align={"flex-start"}
          >
            <ListItem>
              <ListIcon as={IoMdCheckboxOutline} />
              High Quality Video Streaming
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckboxOutline} />
              Thousands of HD UHD 4K Channels with EPG
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckboxOutline} />
              Thousands of HD UHD 4K VOD
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckboxOutline} />
              24/7 Customer Support
            </ListItem>
          </Stack>
          <HStack pt={5} justify="center">
            <Button colorScheme={"pink"} size={{base:"sm",md:"md"}} >Subscribe Now</Button>
            <Button colorScheme={"pink"} variant="outline" size={{base:"sm",md:"md"}} >
              24 Hours Free Trial
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Container>
  );
}
