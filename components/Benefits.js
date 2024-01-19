import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Box,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export default function Benefits() {
  return (
    <Container as={"section"} maxW={"full"}  px={0}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
        <Flex>
          <Image
            alt={"feature image"}
            src={
              "/images/benefits.jpg"
            }
            objectFit={"cover"}
          />
        </Flex>
        <Box bg={"gray.800"} position={"relative"}>
          <Flex
            flex={1}
            zIndex={0}
            display={{ base: "none", lg: "flex" }}
            backgroundSize={"cover"}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            position={"absolute"}
            width={"50%"}
            insetY={0}
            right={0}
          >
            <Flex
              bgGradient={"linear(to-r, gray.800 10%, transparent)"}
              w={"full"}
              h={"full"}
            />
          </Flex>
          <Container maxW={"7xl"} position={"relative"}>
            <Stack direction={{ base: "column", lg: "row" }}>
              <Stack
                flex={1}
                color={"gray.400"}
                justify={{ lg: "center" }}
                py={{ base: 4, md: 8, xl: 10 }}
              >
                <Heading
                  color={"white"}
                  mb={5}
                  fontSize={{ base: "3xl", md: "5xl" }}
                >
                  Benefits.
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {stats.map((stat) => (
                    <Box key={stat.title}>
                      <Text
                      
                        fontSize={"3xl"}
                        color={"white"}
                        mb={3}
                      >
                        {stat.title}
                      </Text>
                      <Text fontSize={"xl"} color={"gray.400"}>
                        {stat.content}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

const StatsText = ({ children }) => (
  <Text as={"span"} fontWeight={700} color={"white"}>
    {children}
  </Text>
);

const stats = [
  {
    title: "Satellite Channels",
    content: (
      <>Enjoy Top rated TV channels with the best streaming experience.</>
    ),
  },
  {
    title: "Fast Connection",
    content: (
      <>
        Once you sign up whether a Free Trial or a Paid Plan. You get access to
        your login credentials.
      </>
    ),
  },
  {
    title: "Home Security",
    content: (
      <>
        With one time payments and 256-Bit encryption module. Your minimal data
        is safe.
      </>
    ),
  },
  {
    title: "24/7 Support",
    content: <>Get a 24 hours 7 days a week Technical Support.</>,
  },
  ,
  {
    title: "DIY Setup",
    content: (
      <>
        No need "Tech Savvy". You just download the app on your TV and you could
        tell what to do.
      </>
    ),
  },
  ,
  {
    title: "Price Match",
    content: (
      <>
        You will not find a second place to save the money with such Quality
        Standards.
      </>
    ),
  },
];
