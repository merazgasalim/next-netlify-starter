import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ReceiptEmail = ({
  orderID,
  orderDate,
  userName,
  subscription,
  price,
}) => (
  <Html>
    <Head />
    <Preview>Get your order summary, estimated delivery date and more</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={track.container}>
          <Row>
            <Column>
              <Text style={global.paragraphWithBold}>Order Number</Text>
              <Text style={track.number}>{orderID}</Text>
            </Column>
            <Column align="right">
              <Link
                style={global.button}
                href="https://tvstreams.net/my-account"
              >
                Order Status
              </Link>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={message}>
          <Img
            src={`https://tvstreams.net/logo.png`}
            width="150"
            height="33.55"
            alt={process.env.companyName}
            style={{ margin: "auto" }}
          />
          <Heading style={global.heading}>It's On Its Way.</Heading>
          <Text style={global.text}>
            You order's is on its way. Use the link above to track its progress.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
            Depending on the difference between our time zone and yours, The
            creation of your IPTV subscription account will be done within 6
            hours max.
          </Text>
          <Text style={{ ...global.text, marginTop: 24 }}>
           Once your subscription account is created, we'll send you an email with your IPTV credentials.
          </Text>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Text style={adressTitle}>Subscriber: {userName}</Text>
          {/* <Text style={{ ...global.text, fontSize: 14 }}>
            2125 Chestnut St, San Francisco, CA 94123
</Text>*/}
        </Section>
        <Hr style={global.hr} />
        <Section
          style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
        >
          <Row>
            <Column>
              <Text style={{ ...paragraph, fontWeight: "500" }}>
                {subscription}
              </Text>
            </Column>
            <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
              <Text style={global.text}>${price}</Text>
            </Column>
          </Row>
        </Section>
        <Hr style={global.hr} />
        <Section style={global.defaultPadding}>
          <Row style={{ display: "inline-flex", marginBottom: 40 }}>
            <Column style={{ width: "170px" }}>
              <Text style={global.paragraphWithBold}>Order Number</Text>
              <Text style={track.number}>{orderID}</Text>
            </Column>
            <Column>
              <Text style={global.paragraphWithBold}>Order Date</Text>
              <Text style={track.number}>{orderDate}</Text>
            </Column>
          </Row>
          <Row>
            <Column align="center">
              <Link
                style={global.button}
                href="https://tvstreams.net/my-account"
              >
                Order Status
              </Link>
            </Column>
          </Row>
        </Section>

        <Hr style={{ ...global.hr, marginTop: "12px" }} />
        <Section style={paddingY}>
          <Row>
            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
              Please contact us if you have any questions. (Simply reply to this
              email)
            </Text>
          </Row>
          <Row>
            <Text style={footer.text}>
              © {new Date().getFullYear()} TV STREAMS. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ReceiptEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  },
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  },
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
};

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const recomendationsText = {
  margin: "0",
  fontSize: "15px",
  lineHeight: "1",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const recomendations = {
  container: {
    padding: "20px 0",
  },
  product: {
    verticalAlign: "top",
    textAlign: "left",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
  text: {
    ...recomendationsText,
    paddingTop: "4px",
    color: "#747474",
  },
};

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
  tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
  },
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  },
};
