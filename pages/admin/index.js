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
  HStack,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { BiDotsVerticalRounded } from "react-icons/bi";
import { FcApprove } from "react-icons/fc";
import { BsInfoLg } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
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
        <MenuItem color="green" icon={<FcApprove />}>
          Approve
        </MenuItem>
        <MenuItem color="orange" icon={<FaBan />}>
          Ban
        </MenuItem>
        <MenuItem
          color="red"
          icon={<AiOutlineUserDelete />}
          onClick={() =>
            setDialogInfo({
              userId: order._id,
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
            <HStack justify={"space-between"}>
              <Text>User name: {order.userName}</Text>
              <Text>Full name: {order.name ?? order.fullName}</Text>
              <Text>Use case: {order.useCase}</Text>
            </HStack>
            <HStack justify={"space-between"}>
              <Text>Age: {order.age}</Text>
              <Text>Email: {order.email}</Text>
              <Text>Phone: {order.phone}</Text>
            </HStack>
            <Text>Address: {order.address}</Text>
            <Text>Joined Courses: {order.myCourses?.length}</Text>
            <Table variant="striped" colorScheme="twitter" size={"xs"}>
              <Thead>
                <Tr>
                  <Th>Course ID</Th>
                  <Th>Approvement</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.myCourses?.map((course, index) => (
                  <Tr key={index}>
                    <Td>{course.courseId}</Td>
                    <Td>{course.approved ? "Yes" : "No"}</Td>
                    <Td>
                      <Tooltip hasArrow label="copy course id" bg="gray.600">
                        <IconButton
                          aria-label="copy course id"
                          icon={<FiCopy />}
                          onClick={() =>
                            navigator?.clipboard.writeText(course.courseId)
                          }
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Text>Students: {order.myStudents?.length}</Text>
            <Table variant="striped" colorScheme="twitter" size={"xs"}>
              <Thead>
                <Tr>
                  <Th>Student ID</Th>
                  <Th>Course ID</Th>
                  <Th>Approvement</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.myStudents?.map((student, index) => (
                  <Tr key={index}>
                    <Td>{student.studentId}</Td>
                    <Td>{student.courseId}</Td>
                    <Td>{student.approved ? "Yes" : "No"}</Td>
                    <Td>
                      <HStack>
                        <Tooltip hasArrow label="copy course id" bg="gray.600">
                          <IconButton
                            aria-label="copy course id"
                            icon={<FiCopy />}
                            onClick={() =>
                              navigator?.clipboard.writeText(student.courseId)
                            }
                          />
                        </Tooltip>
                        <Tooltip hasArrow label="copy student id" bg="gray.600">
                          <IconButton
                            aria-label="copy student id"
                            icon={<FiCopy />}
                            onClick={() =>
                              navigator?.clipboard.writeText(student.studentId)
                            }
                          />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
                  dialogInfo.userId,
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
  console.log(orders)
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
    <Box maxW="7xl" mx={"auto"} pt={20} px={{ base: 2, sm: 12, md: 17 }} minH={minH} >
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
                <Td>{order.purchase_units[0].description.replace(" IPTV Subscription", "")}</Td>
                <Td>{order.stutus}</Td>

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
  );
}

const handelUpdateUser = async (
  userId,
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
        userId,
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
      setDeletedOrders((prevState) => [...prevState, userId]);
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
