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
  Heading,
} from "@chakra-ui/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal({ isOpen, onClose, plan }) {
  console.log(plan);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      isCentered
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>IP TV Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack justify={"space-between"} mb={5}>
            <Text>{plan?.duration} </Text>
            <Text>${plan?.price}</Text>
          </HStack>
          <PayPalButtons style={{ layout: "horizontal" }} />
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
