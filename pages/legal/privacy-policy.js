import {
  Container,
  Heading,
  Text,
  Link,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { minH } from "lib/constants";

export default function Privacy() {
  return (
    <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
      <Box as="section" mb={5}>
        <Heading as={"h1"} mb={5}>
          Privacy Policy
        </Heading>
        <Heading as={"h2"} fontSize="3xl">
          How {process.env.companyName} handles your data
        </Heading>
        <Text>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          {process.env.companyName}.
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          PERSONAL INFORMATION WE COLLECT
        </Heading>
        <Text>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information.”
        </Text>
        <Text>
          We collect Device Information using the following technologies:
        </Text>
        <UnorderedList>
          <ListItem>
            <b>“Cookies”</b> are data files that are placed on your device or
            computer and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit{" "}
            <Link
              href="https://www.allaboutcookies.org"
              isExternal
              color={"teal"}
            >
              https://www.allaboutcookies.org
            </Link>
            .
          </ListItem>
          <ListItem>
            <b>“Log files”</b> track actions occurring on the Site, and collect
            data including your IP address, browser type, Internet service
            provider, referring/exit pages, and date/time stamps.
          </ListItem>
          <ListItem>
            <b>“Web beacons,” “tags,” and “pixels”</b> are electronic files used
            to record information about how you browse the Site.
          </ListItem>
          <ListItem>
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information
            (including credit card numbers and PayPal provided information),
            email address, and phone number. We refer to this information as{" "}
            <b>“Order Information.”</b>
          </ListItem>
        </UnorderedList>
        <Text>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </Text>
      </Box>

      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          HOW DO WE USE YOUR PERSONAL INFORMATION?
        </Heading>
        <Text>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to: Communicate with you; Screen our orders for potential
          risk or fraud; and When in line with the preferences you have shared
          with us, provide you with information or advertising relating to our
          products or services. We use the Device Information that we collect to
          help us screen for potential risk and fraud (in particular, your IP
          address), and more generally to improve and optimize our Site (for
          example, by generating analytics about how our customers browse and
          interact with the Site, and to assess the success of our marketing and
          advertising campaigns).
        </Text>
      </Box>

      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          SHARING YOUR PERSONAL INFORMATION
        </Heading>
        <Text>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. We also use Google
          Analytics to help us understand how our customers use the Site -- you
          can read more about how Google uses your Personal Information here:
          <Link
            href="https://www.google.com/intl/en/policies/privacy/"
            isExternal
            color={"teal"}
          >
            https://www.google.com/intl/en/policies/privacy/
          </Link>
          . You can also opt-out of Google Analytics here:{" "}
          <Link
            href="https://tools.google.com/dlpage/gaoptout"
            isExternal
            color={"teal"}
          >
            https://tools.google.com/dlpage/gaoptout
          </Link>
          . Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          BEHAVIOURAL ADVERTISING
        </Heading>
        <Text>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at
          <Link
            href="https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
            isExternal
            color={"teal"}
          >
            https://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
          </Link>
          .
        </Text>
        <Text>You can opt out of targeted advertising by :</Text>
        <UnorderedList>
          <ListItem>
            FACEBOOK -{" "}
            <Link
              href="https://www.facebook.com/settings/?tab=ads"
              isExternal
              color={"teal"}
            >
              https://www.facebook.com/settings/?tab=ads
            </Link>
            ,
          </ListItem>
          <ListItem>
            GOOGLE -{" "}
            <Link
              href="https://www.google.com/settings/ads/anonymous"
              isExternal
              color={"teal"}
            >
              https://www.google.com/settings/ads/anonymous
            </Link>
            ,
          </ListItem>
          <ListItem>
            BING -
            <Link
              href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
              isExternal
              color={"teal"}
            >
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            </Link>
          </ListItem>
        </UnorderedList>
        <Text>
          Additionally, you can opt out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at:
          <Link href="https://optout.aboutads.info/" isExternal color={"teal"}>
            https://optout.aboutads.info/
          </Link>
          .
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          DO NOT TRACK
        </Heading>
        <Text>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          YOUR RIGHTS
        </Heading>
        <Text>
          If you are a European resident, you have the right to access personal
          information we hold about you and to ask that your personal
          information be corrected, updated, or deleted. If you would like to
          exercise this right, please contact us through the contact information
          below. Additionally, if you are a European resident we note that we
          are processing your information in order to fulfill contracts we might
          have with you (for example if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information will be transferred
          outside of Europe, including to Canada and the United States.
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          DATA RETENTION
        </Heading>
        <Text>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </Text>
      </Box>
      <Box as="section" mb={5}>
        <Heading as={"h3"} fontSize="2xl">
          CHANGES
        </Heading>
        <Text>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons. CONTACT US For more
          information about our privacy practices, if you have questions, or if
          you would like to make a complaint, please contact us by e-mail at{" "}
          <Link href={`mailto:${process.env.supportMail}`} color="teal">
            {process.env.supportMail}
          </Link>{" "}
          .
        </Text>
      </Box>
    </Container>
  );
}
