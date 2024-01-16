import {
  Box,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FcFilm , FcMultipleDevices , FcInTransit,FcVideoProjector  } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={"center"} textAlign="center" spacing={0} >
      <Flex
        w={24}
        h={24}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        //bg={"#1A202C"}
        bg="white"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={"bold"} fontSize="xl">
        {title}
      </Text>
      <Text>{text}</Text>
    </Stack>
  );
};

export default function Partners() {
  return (
    <Container as={"section"} maxW="6xl"  >
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={FcFilm } w={16} h={16} />}
            title={"Premium Channels"}
            text={
              "We serve over 15,000 TV channels. And the number of running TV channels is decreasing day by day."
            }
          />
          <Feature
            icon={<Icon as={FcVideoProjector } w={16} h={16} />}
            title={"VOD Movies"}
            text={
              "We have nearly 20,000 movies and all the new releases. We have almost all popular movies."
            }
          />
          <Feature
            icon={<Icon as={FcMultipleDevices } w={16} h={16} />}
            title={"VOD TV series"}
            text={
              "We also have a large number (200K+) of TV series in our VOD section. Now look at all the new ."
            }
          />
        </SimpleGrid>
      </Box>
     {/* <Marquee>
        {Array(16)
          .fill(null)
          .map((_, idx) => (
            <Image
              key={idx}
              src={`/csp/brand_item${idx + 1}.webp`}
              alt={`brand_${idx + 1}`}
              width={150}
              height={150}
            />
          ))}
          </Marquee>*/}
    </Container>
  );
}
