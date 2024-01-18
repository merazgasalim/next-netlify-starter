import {
  Box,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FcFilm, FcMultipleDevices, FcVideoProjector } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack align={"center"} textAlign="center" spacing={0}>
      <Flex
        w={{ base: 16, md: 20, lg: 24 }}
        h={{ base: 16, md: 20, lg: 24 }}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg="white"
        mb={0}
      >
        {icon}
      </Flex>
      <Text fontWeight={"bold"} fontSize="xl">
        {title}
      </Text>
      <Text color={"gray.500"} fontSize={"lg"}>{text}</Text>
    </Stack>
  );
};

export default function Partners() {
  return (
    <Container as={"section"} maxW="6xl">
      <Box >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={
              <Icon
                as={FcFilm}
                w={{ base: 10, md: 12, lg: 16 }}
                h={{ base: 10, md: 12, lg: 16 }}
              />
            }
            title={"Premium Channels"}
            text={
              "We serve over 15,000 TV channels. And the number of running TV channels is decreasing day by day."
            }
          />
          <Feature
            icon={
              <Icon
                as={FcVideoProjector}
                w={{ base: 10, md: 12, lg: 16 }}
                h={{ base: 10, md: 12, lg: 16 }}
              />
            }
            title={"VOD Movies"}
            text={
              "We have nearly 20,000 movies and all the new releases. We have almost all popular movies."
            }
          />
          <Feature
            icon={
              <Icon
                as={FcMultipleDevices}
                w={{ base: 10, md: 12, lg: 16 }}
                h={{ base: 10, md: 12, lg: 16 }}
              />
            }
            title={"VOD TV series"}
            text={
              "We also have a large number (200K+) of TV series in our VOD section. Now look at all the new ."
            }
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
}
