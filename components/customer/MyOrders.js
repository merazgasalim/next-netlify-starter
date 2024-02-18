import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Spinner,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  SimpleGrid,
  Tooltip,
  Icon,
} from "@chakra-ui/react";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { BsInfoLg } from "react-icons/bs";

const OrderActions = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //Dialag confirmation
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(undefined);
  useEffect(() => {
    if (dialogInfo) setIsOpenDialog(true);
  }, [dialogInfo]);
  useEffect(() => {
    if (!isOpenDialog) setDialogInfo(undefined);
  }, [isOpenDialog]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiDotsVerticalRounded />}
        variant="outline"
      />
      <MenuList>
        <MenuItem color="blue.500" icon={<BsInfoLg />} onClick={onOpen}>
          Full info
        </MenuItem>
      </MenuList>
      <Modal
        onClose={onClose}
        size="5xl"
        isOpen={isOpen}
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full info.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={2}>
              <Text>Name: {order.name}</Text>
              <Text>
                Name (PayPal): {order.payer.name.given_name}
                {order.payer.name.surname}
              </Text>
              <Text>Status: {order.stutus}</Text>
              <Text>Country: {order.country}</Text>
              <Text>Country (PayPal): {order.payer.address.country_code}</Text>
              <Text>Date: {new Date(order.date).toLocaleDateString()}</Text>
              <Text>Type: {order.type}</Text>
              <Text>MAC: {order.mac}</Text>
              <Text>Payment: ${order.purchase_units[0].amount.value} </Text>
              <Text>Email: {order.email}</Text>
              <Text>Email (PayPal) : {order.payer.email_address}</Text>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Menu>
  );
};

export default function MyOrders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  //Load More order when the end reached
  const [observerDisconnected, setObserverDisconnected] = useState(false);
  const ordersLoaderRef = useRef();

  const getNextOrdersPage = useCallback(async () => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastOrderId: orders[orders.length - 1]?._id,
        }),
      });

      if (response.status === 200) {
        const answer = await response.json();
        if (answer.orders.length !== 0) {
          setOrders(orders.concat(answer.orders));
        } else {
          setObserverDisconnected(true);
        }
      } else {
        toast({
          description: "Something went wrong, Please refresh and try again!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        description: "Something went wrong, Please refresh and try again!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(err);
    }
  }, [orders, toast]);
  useEffect(() => {
    if (!ordersLoaderRef.current) return;
    const ob = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          getNextOrdersPage();
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );
    ob.observe(ordersLoaderRef.current);
    return () => {
      ob.disconnect();
    };
  }, [getNextOrdersPage]);

  const [deletedOrders, setDeletedOrders] = useState([]);
  return (
    <Box mt={5}>
      <Heading textAlign={"left"} fontSize={"2xl"} fontWeight={"bold"} mb={2}>
        My Orders
      </Heading>
      <Box overflowX={"auto"}>
        <Table variant="striped" colorScheme="twitter" size={"sm"}>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>MAC</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr
                key={order._id}
                style={{
                  textDecoration: deletedOrders.includes(order._id)
                    ? "line-through"
                    : "none",
                }}
              >
                <Td>{order.type}</Td>
                <Td>{order.mac}</Td>
                <Td>
                  {order.purchase_units[0].description.replace(
                    " IPTV Subscription",
                    ""
                  )}
                </Td>
                <Td
                  color={
                    order.stutus === "Pending"
                      ? "orange.500"
                      : order.stutus === "Delivered"
                        ? "green.500"
                        : order.stutus === "Banned"
                          ? "red.500"
                          : "black"
                  }
                >
                  <Tooltip
                    hasArrow
                    label={tooltipMSG(order.stutus)}
                    bg="gray.300"
                    color="black"
                  >
                    <Text as={"span"}>
                      {order.stutus}
                      <Icon as={BsInfoCircleFill} ml={2} />
                    </Text>
                  </Tooltip>
                </Td>

                <Td>
                  <OrderActions order={order} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      {!observerDisconnected && (
        <Center m={5} ref={ordersLoaderRef}>
          <Spinner size={"md"} />
        </Center>
      )}
    </Box>
  );
}

const tooltipMSG = (status) => {
  switch (status) {
    case "Pending":
      return "We're creating your IPTV account, You'll receive an email with your credentials within 6 hours max.";
    case "Delivered":
      return "Your IPTV account has been created. Please check your email (Don't forget Spam/Junk folder)";
    case "Banned":
      return "Your account has been terminated, If you believe this was a mistake please contact us";
    default:
      return "";
  }
};
