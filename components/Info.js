import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export default function Info() {
  return (
    <Container as={"section"} maxW={"6xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Heading>More to Stream.</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            Enjoy unlimited access to the world of entertainment. Kick back with
            full seasons of exclusive Originals, the mega-hit movie library,
            popular TV-shows, news, late-night comedy, live sports, and more.
            That’s a $14.99 a month value at no extra cost, no strings attached.
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Watch exclusive sports channels every week. Get top-rated TV
            customer service. Bundle your favorite services.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Button colorScheme={"pink"}>Learn More</Button>
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={
              "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
