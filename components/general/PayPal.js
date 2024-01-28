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
  VStack,
} from "@chakra-ui/react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { TbDownloadOff } from "react-icons/tb";
import { countryList } from "lib/constants";
import * as Yup from "yup";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const ButtonWrapper = ({ plan, profile, isDisabled }) => {
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
          } else {
            toast({
              description: res.reason,
              status: "warning",
              //duration: 9000,
              isClosable: true,
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

 

  const formik = useFormik({
    initialValues: {
      authenticated: false,
      name: process.env.NODE_ENV === "production" ? "" : "Salimo",
      email:
        process.env.NODE_ENV === "production" ? "" : "merazgasalim@hotmail.fr",
      country: process.env.NODE_ENV === "production" ? "" : "Algeria",
      mac: process.env.NODE_ENV === "production" ? "" : "00:11:22:33:44:55",
      type: process.env.NODE_ENV === "production" ? "" : "M3U",
      password: "",
      rePassword: "",
    },
    validationSchema: profileFormValidation,
    onSubmit: (values) => {
     
      //alert(JSON.stringify(values, null, 2));
      //handelUpdateProfile(values);
    },
  });

  const formikSignin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinFormValidation,
    onSubmit: (values) => {
    
      signIn("credentials", { email: values.email, password: values.password });
      //alert(JSON.stringify(values, null, 2));
      //handelUpdateProfile(values);
    },
  });
  //console.log(session, status, formik.values);
  useEffect(() => {
    if (status === "authenticated") {
      formik.setFieldValue("email", session.user.email, true);
      formik.setFieldValue("name", session.user.name, true);
      formik.setFieldValue("country", session.user.image, true);
      formik.setFieldValue("authenticated", true, true);
    }
  }, [status]);
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
        <ModalBody>
          {status === "authenticated" ? (
            <Text fontWeight={"bold"} textAlign="right" mb={2}>
              Signed in as {session.user.email}
            </Text>
          ) : (
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>New customer</Tab>
                <Tab>Already have an account</Tab>
              </TabList>
              <TabPanels>
                <TabPanel px={0} as="form" onSubmit={formik.handleSubmit}>
                  <Button type="submit">ok</Button>
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
                    isInvalid={formik.touched.country && formik.errors.country}
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
                    <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
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
                    <FormLabel htmlFor="rePassword">Confirm Password</FormLabel>
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
                  <VStack
                    as={"form"}
                    id="sign-in-form"
                    onSubmit={formikSignin.handleSubmit}
                    maxW={"md"}
                    mx="auto"
                    spacing={5}
                    justify={"center"}
                  >
                    <FormControl
                      isInvalid={
                        formikSignin.touched.email && formikSignin.errors.email
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="signin-email">Email</FormLabel>
                      <Input
                        id="signin-email"
                        type={"email"}
                        placeholder={"you@example.com"}
                        {...formikSignin.getFieldProps("email")}
                      />
                      <FormErrorMessage>
                        {formikSignin.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formikSignin.touched.password &&
                        formikSignin.errors.password
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="signin-password">Password</FormLabel>
                      <Input
                        id="signin-password"
                        type={"password"}
                        placeholder={"********"}
                        {...formikSignin.getFieldProps("password")}
                      />
                      <FormErrorMessage>
                        {formikSignin.errors.password}
                      </FormErrorMessage>
                    </FormControl>

                    <HStack justify={"space-between"} w="full">
                      <Button colorScheme={"blue"} type="submit">
                        Sign in
                      </Button>
                    </HStack>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}

          <Divider my={5} />
          <FormControl
            isInvalid={formik.touched.type && formik.errors.type}
            isRequired
          >
            <FormLabel htmlFor="type">Device Type</FormLabel>
            <Select
              id="type"
              {...formik.getFieldProps("type")}
              placeholder={"Type"}
            >
              <option value={"Smart TV"}>Smart TV</option>
              <option value={"M3U"}>M3U</option>
              <option value={"Enigma"}>Enigma</option>
            </Select>
            <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.mac && formik.errors.mac}>
            <FormLabel htmlFor="mac"> Mac address (Optional) </FormLabel>
            <Input
              id="mac"
              placeholder={"AA.BB.CC.DD.EE.FF"}
              {...formik.getFieldProps("mac")}
            />
            <FormErrorMessage>{formik.errors.mac}</FormErrorMessage>
          </FormControl>

          <Divider my={5} />
          <HStack justify={"space-between"} mb={5} fontWeight="bold">
            <Text>{plan?.duration} subscription. </Text>
            <Text>${plan?.price}</Text>
          </HStack>
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
              isDisabled={!profileFormValidation.isValidSync(formik.values)}
            />
          </PayPalScriptProvider>
        </ModalBody>
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
    .nullable()
    .notRequired()
    .matches(
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/,
      {
        message: "MAC address should be in this format: AA:BB:CC:DD:EE:FF",
        excludeEmptyString: true,
      }
    ),
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
});
const signinFormValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
