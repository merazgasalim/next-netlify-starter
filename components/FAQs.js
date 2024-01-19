import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image,Link
} from "@chakra-ui/react";

export default function FAQs() {
  return (
    <Container as={"section"} maxW="6xl" id="contact">
      <Heading as={"h2"} textAlign="center" mb={5}>
        We Cover Almost All Countries Around The World
      </Heading>
      <Text textAlign="center" mb={5} color={"gray.500"} fontSize={"lg"}>
        We offer thousands of IPTV channels covering the Uk, USA, Canada,
        Portugal, Albania, Germany, Italy, France, Brasil, Romania, Greece,
        Spain, Ireland, Latino countries, Arabic countries and almost all
        countries around the world.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} pt={5}>
        <Box display={{base:"block",md:"none"}} >
          <Image src="/images/worldwide.jpg" alt="world_wide_service" />
        </Box>
        <Accordion>
          {FAQ.map((f, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" fontWeight={"bold"} >
                    {f.q}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{f.a}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        <Box display={{base:"none",md:"block"}} >
          <Image src="/images/worldwide.jpg" alt="world_wide_service" />
        </Box>
      </SimpleGrid>

      <Heading as={"h2"} textAlign="center" mb={5} mt={5}>
        Have Any Question?
      </Heading>
      <Text textAlign="center" color={"gray.500"} fontSize={"lg"}>
        Our support team is available 24/7, Feel free to contact us
      </Text>
      <Text textAlign="center" color={"gray.500"} fontSize={"lg"}>
        you can use live chat or send us an email to  <Link href={`mailto:${process.env.supportMail}`} color="teal">
          {process.env.supportMail}
        </Link>
      </Text>
    </Container>
  );
}

const FAQ = [
  {
    q: "Am I able to watch IPTV on several devices simultaneously with a single subscription?",
    a: "Unfortunately, you won’t have the ability to do this. Using a single account for multiple connections can result in your IP address and username being blocked. With that said, you do have the ability to buy an additional connection for an extra fee.",
  },
  {
    q: "What does the package include?",
    a: "When you subscribe IPTVSPACE, you get all Live TV, VOD and sports.",
  },
  {
    q: "Can I have a Free Trial?",
    a: "Yes , You will have a trail for free to test our server IPTV",
  },
  {
    q: "How will I receive my subscription?",
    a: "After making a payment you’ll be contacted via email betwen 1 to 24 hour with your logins credentials.",
  },
  {
    q: "What types of devices are supported?",
    a: "Various devices are supported by us, including Smart TV, Kodi, VLC, PC, Vu+, DreamBox, Enigma, Android Boxes, Android Smart Phones, and Max.",
  },
  {
    q: "Is a satellite or dish equipment required to use IPTV?",
    a: "Satellite or dish equipment is not necessary to use IPTV. Our servers will connect you to the IPTV platform using your internet connection.",
  },
];
