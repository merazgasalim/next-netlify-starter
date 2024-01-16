import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  HStack,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function PriceWrapper(props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    
    >
      {children}
    </Box>
  );
}
export default function Plans() {
  return (
    <Container as={"section"} maxW="full" textAlign={"center"}   id="plans">
      <Heading as={"h2"}  >Choose Your Perfect Plan</Heading>

      <Text>
        Enjoy unlimited access to the world of entertainment. Kick back with
        full seasons of exclusive Originals, the mega-hit movie library and
        more.
      </Text>

      <SimpleGrid
        // direction={{ base: "column", md: "row" }}
        columns={{ base: 1, md: 2, lg: 4 }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
        w={"full"}
      >
        {Offers.map((plan, idx) => (
          <PriceWrapper key={idx}>
            <Box py={4} px={{ base: 2, md: 12 }}>
              <Text fontWeight="500" fontSize="2xl">
                {plan.duration}
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  {plan.price}
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /month
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={{ base: 2, md: 12 }}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Up to 15,000 Channels
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Up to 40,000 Vods
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  8K / 4K Picture Quality
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Without Freezing
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  99.9% Server Uptime
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  24/7 Support
                </ListItem>
              </List>
              <VStack w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline">
                  Start trial
                </Button>
                <Button w="full" colorScheme="red">
                  Subscribe
                </Button>
              </VStack>
            </VStack>
          </PriceWrapper>
        ))}
      </SimpleGrid>
    </Container>
  );
}

const Offers = [
  { duration: "1 month", price: "14.99" },
  { duration: "3 months", price: "39.99" },
  { duration: "6 months", price: "59.99" },
  { duration: "12 months", price: "119.99" },
];