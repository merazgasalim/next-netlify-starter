import {
  Container,
  Heading,
  Text,
  Box,
  useDisclosure,
  HStack,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import PayPal from "./general/PayPal";
import { Offers } from "lib/constants";
import { FaCheckCircle } from "react-icons/fa";

import { useState } from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [plan, setPlan] = useState();
  return (
    <Container as={"section"} maxW="full" textAlign={"center"} id="plans">
      <Heading as={"h2"}>Choose Your Perfect Plan</Heading>

      <Text color={"gray.500"} fontSize={"lg"} mb={2}>
        Enjoy unlimited access to the world of entertainment. Kick back with
        full seasons of exclusive Originals, the mega-hit movie library and
        more.
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
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
                <Button
                  w="full"
                  colorScheme="red"
                  onClick={() => {
                    setPlan(plan);
                    onOpen();
                  }}
                >
                  Subscribe
                </Button>
              </VStack>
            </VStack>
          </PriceWrapper>
        ))}
      </SimpleGrid>

      {isOpen && plan && (
        <PayPal isOpen={isOpen} onClose={onClose} plan={plan} />
      )}
    </Container>
  );
}


