import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
  Link,
  Heading,
  Icon,
  VStack,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { FcInfo } from "react-icons/fc";
import { BsInfoCircleFill } from "react-icons/bs";

import SigninForm from "./SigninForm";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Link as ChakraLink } from "@chakra-ui/next-js";
import { TbDownloadOff } from "react-icons/tb";
import { countryList } from "lib/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { LuCheckCircle } from "react-icons/lu";
import { TbMailFast } from "react-icons/tb";
import { RiAccountPinCircleFill } from "react-icons/ri";

const ButtonWrapper = ({ plan, profile, isDisabled, setOrderDone }) => {
  const toast = useToast();
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const getAmount = () => {
    let GTotal = plan.price;
    return {
      currency_code: "USD",
      value: GTotal,
      breakdown: {
        item_total: {
          currency_code: "USD",
          value: GTotal,
        },
        // shipping: {
        //   value: shippingCost / 100,
        //   currency_code: "USD",
        // },
        discount: {
          value: "0.00",
          currency_code: "USD",
        },
      },
    };
  };

  const getItems = () => {
    let items = [
      {
        name: `${plan.duration} IPTV Subscription`,
        //sku: item.sku,
        unit_amount: {
          currency_code: "USD",
          value: plan.price,
        },
        quantity: 1,
        description: `${plan.duration} IPTV Subscription`,
        category: "DIGITAL_GOODS",
      },
    ];

    //console.log(items);
    return items;
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: getAmount(),
          description: `${plan.duration} IPTV Subscription`,
          items: getItems(),
          soft_descriptor: process.env.companyName,
        },
      ],

      application_context: {
        brand_name: process.env.companyName,
        shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
      },
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.get().then(function (details) {
      const body = {
        paypal: { ...details, ...profile },
      };

      return fetch(`/api/orders`, {
        method: "PUT",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            //afterSuccess();
            console.log(res);
            setOrderDone(res);
          } else {
            toast({
              description: res.reason,
              status: "warning",
              //duration: 9000,
              isClosable: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const onError = (err) => {
    console.log(err.toString());
  };

  if (isPending) return <Spinner />;
  if (isRejected) return <TbDownloadOff color="tomato" />;
  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "pill" }}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
      disabled={isDisabled}
      forceReRender={[profile]}
    />
  );
};

export default function PayPal({ isOpen, onClose, plan }) {
  const { data: session, status } = useSession();
  const [orderDone, setOrderDone] = useState(null);

  const formik = useFormik({
    initialValues: {
      authenticated: false,
      name: process.env.NODE_ENV === "production" ? "" : "Salimo",
      email:
        process.env.NODE_ENV === "production" ? "" : "merazgasalim@hotmail.fr",
      country: process.env.NODE_ENV === "production" ? "" : "Algeria",
      mac: process.env.NODE_ENV === "production" ? "" : "00:11:22:33:44:55",
      type: process.env.NODE_ENV === "production" ? "" : "M3U",
      password: process.env.NODE_ENV === "production" ? "" : "ik58DhuZNu5xqaR@",
      rePassword:
        process.env.NODE_ENV === "production" ? "" : "ik58DhuZNu5xqaR@",
      acceptTerms: false,
      acceptPrivacy: false,
    },
    validationSchema: profileFormValidation,
    onSubmit: (values) => {},
  });

  useEffect(() => {
    if (status === "authenticated") {
      formik.setFieldValue("email", session.user.email, true);
      formik.setFieldValue("name", session.user.name, true);
      formik.setFieldValue("country", session.user.image, true);
      formik.setFieldValue("authenticated", true, true);
    }
  }, [status]);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>IP TV Subscription</ModalHeader>
        <ModalCloseButton />
        {orderDone?.success ? (
          <ModalBody as={VStack} spacing={5}>
            <Icon as={LuCheckCircle} w={16} h={16} color="#F96663" />
            <Heading as="h3">Thank You!</Heading>
            <Text fontSize={"xl"}>
              Your subscription was completed successfully.
            </Text>
            <HStack>
              <Icon as={TbMailFast} w={16} h={16} color="#8A56C3" />
              <Text>
                An email receipt including the details about your subscription
                will be sent to the email address provided. Please keep it for
                your records.
                <br />
                <Text as={"span"} fontWeight={"bold"}>
                  Don't forget to check Spam/Junk folder.
                </Text>
              </Text>
            </HStack>
            <HStack>
              <Text>
                You can visit the{" "}
                <ChakraLink href="/my-account" color={"teal"} fontWeight="bold">
                  Client Area
                </ChakraLink>{" "}
                page to check the status of your subscription.{" "}
                {!orderDone?.accountCreated && (
                  <Text as={"span"} fontWeight="bold" color={"gray.500"}>
                    An account under your email already exist, Please use your
                    previous password or simply{" "}
                    <ChakraLink href={"/auth/reset-password"} color="teal">
                      reset it
                    </ChakraLink>
                    .
                  </Text>
                )}
              </Text>{" "}
              <Icon as={RiAccountPinCircleFill} w={16} h={16} color="#FAB355" />
            </HStack>
          </ModalBody>
        ) : (
          <ModalBody>
            {status === "authenticated" ? (
              <Text fontWeight={"bold"} textAlign="right" mb={2}>
                Signed in as {session.user.email}
              </Text>
            ) : (
              <Tabs
                isFitted
                variant="enclosed"
                index={tabIndex}
                onChange={handleTabsChange}
              >
                <TabList mb="1em">
                  <Tab>New customer</Tab>
                  <Tab>Already have an account</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <FormControl
                      isInvalid={formik.touched.name && formik.errors.name}
                      isRequired
                    >
                      <FormLabel htmlFor="name"> Full name</FormLabel>
                      <Input
                        id="name"
                        placeholder={"Full Name"}
                        {...formik.getFieldProps("name")}
                      />
                      <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={formik.touched.email && formik.errors.email}
                      isRequired
                    >
                      <FormLabel htmlFor="email"> Email</FormLabel>
                      <Input
                        id="email"
                        type={"email"}
                        placeholder={"ex: you@gmail.com"}
                        {...formik.getFieldProps("email")}
                      />
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        formik.touched.country && formik.errors.country
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="country"> Country</FormLabel>
                      <Select
                        id="country"
                        {...formik.getFieldProps("country")}
                        placeholder={"Country"}
                      >
                        {countryList.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.country}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        id="password"
                        type={"password"}
                        {...formik.getFieldProps("password")}
                      />
                      <FormErrorMessage>
                        {formik.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.rePassword && formik.errors.rePassword
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="rePassword">
                        Confirm Password
                      </FormLabel>
                      <Input
                        id="rePassword"
                        type={"password"}
                        {...formik.getFieldProps("rePassword")}
                      />
                      <FormErrorMessage>
                        {formik.errors.rePassword}
                      </FormErrorMessage>
                    </FormControl>
                  </TabPanel>
                  <TabPanel py={0}>
                    <SigninForm registerFn={setTabIndex} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}

            <Divider my={5} />
            <FormControl
              isInvalid={formik.touched.type && formik.errors.type}
              isRequired
            >
              <FormLabel htmlFor="type">
                Device Type{" "}
                <Tooltip label={<DeviceTypeDescription />} fontSize='md' bg='transparent' color='black' hasArrow>
                  <Box as="span">
                    <Icon as={BsInfoCircleFill} color={"blue.500"} />
                  </Box>
                </Tooltip>
              </FormLabel>
              <Select
                id="type"
                {...formik.getFieldProps("type")}
                placeholder={"Type"}
              >
                <option value={"m3u "}>M3U</option>
                <option value={"mag"}>MAG</option>
              </Select>
              <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
            </FormControl>

            {formik.values.type === "mag" && (
              <FormControl
                isInvalid={formik.touched.mac && formik.errors.mac}
                isRequired={formik.values.type === "mag"}
              >
                <FormLabel htmlFor="mac">Mac address</FormLabel>
                <Input
                  id="mac"
                  placeholder={"AA.BB.CC.DD.EE.FF"}
                  {...formik.getFieldProps("mac")}
                />
                <FormErrorMessage>{formik.errors.mac}</FormErrorMessage>
              </FormControl>
            )}

            <Divider my={5} />
            <HStack justify={"space-between"} mb={2} fontWeight="bold">
              <Text>{plan?.duration} subscription. </Text>
              <Text>${plan?.price}</Text>
            </HStack>

            <FormControl
              isRequired
              isInvalid={
                formik.touched.acceptTerms && formik.errors.acceptTerms
              }
            >
              <HStack>
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  colorScheme="green"
                  isChecked={formik.values.acceptTerms}
                  onChange={formik.handleChange}
                />
                <Link href="/legal/terms-of-service" isExternal color="teal">
                  I have read and agree the terms of service
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </HStack>
              <FormErrorMessage>{formik.errors.acceptTerms}</FormErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={
                formik.touched.acceptPrivacy && formik.errors.acceptPrivacy
              }
              mb={5}
            >
              <HStack>
                <Checkbox
                  id="acceptPrivacy"
                  name="acceptPrivacy"
                  colorScheme="green"
                  isChecked={formik.values.acceptPrivacy}
                  onChange={formik.handleChange}
                />
                <Link href="/legal/privacy-policy" isExternal color="teal">
                  I have read and agree the privacy policy
                  <ExternalLinkIcon mx="2px" />
                </Link>
              </HStack>
              <FormErrorMessage>
                {formik.errors.acceptPrivacy && formik.errors.acceptPrivacy}
              </FormErrorMessage>
            </FormControl>

            <PayPalScriptProvider
              options={{
                //clientId: "test",
                clientId: process.env.PayPal_ClientID,
                components: "buttons",
                currency: "USD",
                intent: "capture",
              }}
            >
              <ButtonWrapper
                plan={plan}
                profile={formik.values}
                setOrderDone={setOrderDone}
                isDisabled={!profileFormValidation.isValidSync(formik.values)}
              />
            </PayPalScriptProvider>
          </ModalBody>
        )}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const profileFormValidation = Yup.object({
  authenticated: Yup.boolean(),
  name: Yup.string().min(4).max(100).required(),
  email: Yup.string().email().required(),
  country: Yup.string().required(),
  mac: Yup.string()
    //.nullable()
    // .notRequired()
    .when("type", {
      is: (type) => type === "mag",
      then: () =>
        Yup.string()
          .required()
          .matches(
            /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/,
            {
              message:
                "MAC address should be in this format: AA:BB:CC:DD:EE:FF",
              excludeEmptyString: true,
            }
          ),
    }),
  type: Yup.string().required(),
  //status === "authenticated"
  password: Yup.string().when("authenticated", ([authenticated], schema) => {
    return authenticated
      ? schema.nullable().notRequired()
      : schema
          .required("Password is required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          );
  }),

  rePassword: Yup.string()
    //.oneOf([Yup.ref("password"), null], "Passwords must match")
    .when("authenticated", ([authenticated], schema) => {
      return authenticated
        ? schema.nullable().notRequired()
        : schema.oneOf([Yup.ref("password"), null], "Passwords must match");
    }),
  acceptTerms: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .required(),
  acceptPrivacy: Yup.bool()
    .oneOf([true], "You must accept the privacy of policy")
    .required(),
});

const DeviceTypeDescription = () => {
  return (
    <Box p={2} w={{base:"90vw",md:"50vw"}} bg='gray.300' shadow={"md"} borderRadius={"md"} >
      <Heading as={"h4"} fontSize={"xl"}>
        Which is Right for me – MAG vs M3U Subscriptions?
      </Heading>
      <Text mb={2} >
        MAG and M3U subscriptions depends on the device you are using:
      </Text>
      <Heading as={"h5"} fontSize={"lg"}>
        MAG Subscription:
      </Heading>
      <Text mb={2}>
        MAG Boxes are some of the most popular devices designed for streaming
        IPTV content. They are small set-top boxes that allow users to watch
        live TV and on-demand content through the internet, without the need for
        a cable or satellite connection. MAG boxes have become increasingly
        popular in recent years due to their versatility, ease of use, and
        ability to provide a high-quality streaming experience. MAG
        Subscriptions require <b>the devices MAC address</b> to be associated with the
        subscription. These are specific devices that are typically setup for
        IPTV (typically Infomir, Formuler, etc.).
      </Text>
      <Heading as={"h5"} fontSize={"lg"}>
        M3U Subscription:
      </Heading>
      <Text>
        M3U Subscriptions are for basically everything else. Therefore if you
        have a <b>Smart TV</b>, <b>Laptop</b>, <b>mobile device</b>, <b>iOS</b>, <b>Firestick</b>, etc. then the
        M3U Subscription would be for you. M3U subscriptions are the most
        popular subscription as it allows you to use the same login credentials
        on multiple devices.
      </Text>
    </Box>
  );
};
