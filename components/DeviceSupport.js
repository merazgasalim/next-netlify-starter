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
  List,
  ListItem,
} from "@chakra-ui/react";

export default function DeviceSupport() {
  return (
    <Container as={"section"} maxW={"6xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"/images/multi_devices.jpg"}
            objectFit={"cover"}
          />
        </Flex>
        <Stack spacing={4}>
          <Heading>Multiple devices supports M3U & MAG</Heading>
          <List>
            <ListItem>
              <Text fontWeight={"bold"} fontSize="lg">
                Smart TV, Smart Phone, Tablets, Android and TV BOX
              </Text>
              You can use Our Server services on all Smart Phones & TVs, Android
              Box, and all devices that can play IPTV powered with different OS
              (Android, iOS, Windows & …)
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} fontSize="lg">
                Mag Devices & Mag simulators
              </Text>
              Just send us your Mac Address related to your MAG Device or your
              Mag simulator (like STB). We send you Mag portal and you have
              access to the biggest playlist ever!
            </ListItem>
            <ListItem>
              <Text fontWeight={"bold"} fontSize="lg">
                Laptop & Computers
              </Text>
              Our Server service is flexible and you can play line on almost all
              digital devices. You can install an IPTV player on your computer
              and enjoy watching IPTV.
            </ListItem>
          </List>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
