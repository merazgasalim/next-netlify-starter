import { useState, useEffect, useCallback, useRef } from "react";
import { NextSeo } from "next-seo";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  SimpleGrid,
} from "@chakra-ui/react";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { BsInfoLg } from "react-icons/bs";
import { FaBan } from "react-icons/fa";

import { AiOutlineUserDelete } from "react-icons/ai";

import { minH } from "lib/constants";

const OrderActions = ({ order, setDeletedOrders }) => {
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
        <MenuItem
          color="green"
          icon={<FcApprove />}
          onClick={() =>
            setDialogInfo({
              orderId: order._id,
              title: "Approve Customer",
              message: "Are you sure? This order will be marked as delivred.",
              actionName: "Approve",
            })
          }
        >
          Approve
        </MenuItem>
        <MenuItem
          color="orange"
          icon={<FaBan />}
          onClick={() =>
            setDialogInfo({
              orderId: order._id,
              title: "Ban Customer",
              message: "Are you sure? This order will be marked as banned.",
              actionName: "Ban",
            })
          }
        >
          Ban
        </MenuItem>
        <MenuItem
          color="red"
          icon={<AiOutlineUserDelete />}
          onClick={() =>
            setDialogInfo({
              orderId: order._id,
              title: "Delete Customer",
              message: "Are you sure? You can't undo this action afterwards.",
              actionName: "Delete",
            })
          }
        >
          Delete
        </MenuItem>
        <MenuItem color="blue" icon={<BsInfoLg />} onClick={onOpen}>
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
      {dialogInfo && (
        <Confirmation
          isOpen={isOpenDialog}
          setIsOpen={setIsOpenDialog}
          dialogInfo={dialogInfo}
          setDeletedOrders={setDeletedOrders}
        />
      )}
    </Menu>
  );
};

//Ban Approve Delete Confirmation Dialogue
const Confirmation = ({ isOpen, setIsOpen, dialogInfo, setDeletedOrders }) => {
  const cancelRef = useRef();
  const toast = useToast();
  //Approve, Ban or delete user
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {dialogInfo.title}
          </AlertDialogHeader>

          <AlertDialogBody>{dialogInfo.message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              isLoading={loading}
              colorScheme="red"
              ml={3}
              onClick={() =>
                handelUpdateUser(
                  dialogInfo.orderId,
                  dialogInfo.actionName,
                  setLoading,
                  toast,
                  setDeletedOrders,
                  setIsOpen
                )
              }
            >
              {dialogInfo.actionName}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default function Orders() {
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  //Load More order when the end reached
  const [observerDisconnected, setObserverDisconnected] = useState(false);
  const ordersLoaderRef = useRef();
 
  const getNextOrdersPage = useCallback(async () => {
    try {
      const response = await fetch("/api/orders", {
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
    <>
      <NextSeo
        title="Admin Account"
        description="Admin Account"
        nofollow
        noindex
      />
      <Box
        maxW="7xl"
        mx={"auto"}
        pt={20}
        px={{ base: 2, sm: 12, md: 17 }}
        minH={minH}
      >
        <Heading textAlign={"center"} fontSize={"2xl"} fontWeight={"bold"}>
          Orders
        </Heading>
        <Box overflowX={"auto"}>
          <Table variant="striped" colorScheme="twitter" size={"sm"}>
            <Thead>
              <Tr>
                <Th>Full name</Th>
                <Th>Email</Th>
                <Th>Country</Th>
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
                  <Td>{order.name}</Td>
                  <Td>{order.email}</Td>
                  <Td>{order.country}</Td>
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
                        ? "red.500"
                        : order.stutus === "Delivered"
                          ? "green.500"
                          : order.stutus === "Banned"
                            ? "orange.500"
                            : "black"
                    }
                  >
                    {order.stutus}
                  </Td>

                  <Td>
                    <OrderActions
                      order={order}
                      setDeletedOrders={setDeletedOrders}
                    />
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
    </>
  );
}

const handelUpdateUser = async (
  orderId,
  action,
  setLoading,
  toast,
  setDeletedOrders,
  setIsOpen
) => {
  setLoading(true);
  try {
    const res = await fetch("/api/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        action,
      }),
    });
    const answer = await res.json();
    if (res.status === 200) {
      toast({
        description: "Done!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (action === "Delete")
        setDeletedOrders((prevState) => [...prevState, orderId]);
      setIsOpen(false);
    } else {
      toast({
        description: answer.reason,
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
  } finally {
    setLoading(false);
  }
};
