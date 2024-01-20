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

const ButtonWrapper = ({ plan,profile, isDisabled }) => {
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
          soft_descriptor: "incolive",
        },
      ],

      application_context: {
        brand_name: "incolive",
        shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
      },
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.get().then(function (details) {
      const body = {
        paypal: {...details,...profile},
        
      };

      return fetch(`/api/orders`, {
        method: "PUT",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
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
  const formik = useFormik({
    initialValues: {
      nickName: process.env.NODE_ENV === "production" ? "" : "Salimo",
      email: process.env.NODE_ENV === "production" ? "" : "merazgasalim@hotmail.fr",
      country: process.env.NODE_ENV === "production" ? "" : "Algeria",
      mac: process.env.NODE_ENV === "production" ? "" : "00:11:22:33:44:55",
      type: process.env.NODE_ENV === "production" ? "" : "M3U",
    },
    validationSchema: profileFormValidation,
    onSubmit: (values) => {
      console.log(values);
      //alert(JSON.stringify(values, null, 2));
      //handelUpdateProfile(values);
    },
  });
 
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
          <form>
            <FormControl
              isInvalid={formik.touched.nickName && formik.errors.nickName}
              isRequired
            >
              <FormLabel htmlFor="nickName"> Nickname</FormLabel>
              <Input
                id="nickName"
                placeholder={"Nick Name"}
                {...formik.getFieldProps("nickName")}
              />
              <FormErrorMessage>{formik.errors.nickName}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.email && formik.errors.email}
              isRequired
            >
              <FormLabel htmlFor="nickName"> Email</FormLabel>
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

            <FormControl isInvalid={formik.touched.mac && formik.errors.mac}>
              <FormLabel htmlFor="mac"> Mac address (Optional) </FormLabel>
              <Input
                id="mac"
                placeholder={"AA.BB.CC.DD.EE.FF"}
                {...formik.getFieldProps("mac")}
              />
              <FormErrorMessage>{formik.errors.mac}</FormErrorMessage>
            </FormControl>

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
          </form>
          <Divider my={5} />
          <HStack justify={"space-between"} mb={5}>
            <Text>{plan?.duration} subscription. </Text>
            <Text>${plan?.price}</Text>
          </HStack>
          <PayPalScriptProvider
            options={{
              clientId: "test",
              components: "buttons",
              currency: "USD",
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
  nickName: Yup.string().min(3).max(15).required(),
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
});
