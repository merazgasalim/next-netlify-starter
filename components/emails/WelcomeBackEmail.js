import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components";

export const WelcomeBackEmail = ({ userFirstname }) => (
  <Html>
    <Head />
    <Preview>
      The IPTV platform that helps you get your IPTV subscription for endless
      entertainment.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://tvstreams.net/logo.png`}
          width="150"
          height="33.55"
          alt={process.env.companyName}
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome Back to {process.env.companyName}, The IPTV platform that
          helps you get your IPTV subscription for endless entertainment.
        </Text>
        <Text style={paragraph}>
          Your email already existed in our records, If you forgot your password
          then you can easily reset it{" "}
          <Link style={link} href={"https://tvstreams.net/auth/reset-password"}>
            👉 Click here to reset your password 👈
          </Link>
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://tvstreams.net/#plans">
            Select Your Plan
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The TV STREAMS team
        </Text>
      </Container>
    </Body>
  </Html>
);

WelcomeBackEmail.PreviewProps = {
  userFirstname: "Alan",
};

export default WelcomeBackEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const link = {
  color: "#FF6363",
};
