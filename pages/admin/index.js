import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Heading,
  Button,
} from "@chakra-ui/react";
import { minH } from "lib/constants";

export default function index() {
  return (
    <Container maxW={"6xl"} pt={20} minH={minH} >
      <Heading as={"h1"}>Orders</Heading>
      <TableContainer>
        <Table variant="striped" size={"sm"}  >
          <Thead>
            <Tr>
              <Th>Nickname</Th>
              <Th>Email</Th>
              <Th>Country</Th>
              <Th>Type</Th>
              <Th>MAC</Th>
              <Th>Duration</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Merazga</Td>
              <Td>salim@gmail.com)</Td>
              <Td>Algeria</Td>
              <Td>M3U</Td>
              <Td>AA:aa:aa:aa:aa:aa</Td>
              <Td>12 Months</Td>
              <Td>delivred</Td>
              <Td>
                <Button colorScheme={"facebook"} size="sm" >Done</Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>Merazga</Td>
              <Td>salim@gmail.com</Td>
              <Td>Algeria</Td>
              <Td>M3U</Td>
              <Td>AA:aa:aa:aa:aa:aa</Td>
              <Td>6 Months</Td>
              <Td>Not delivred</Td>
              <Td>
                <Button colorScheme={"facebook"} size="sm" >Done</Button>
              </Td>
            </Tr>{" "}
            <Tr>
              <Td>Merazga</Td>
              <Td>salim@gmail.com</Td>
              <Td>Algeria</Td>
              <Td>M3U</Td>
              <Td></Td>
              <Td>12 Months</Td>
              <Td>Not delivred</Td>
              <Td>
                <Button colorScheme={"facebook"} size="sm" >Done</Button>
              </Td>
            </Tr>
          </Tbody>
        
        </Table>
      </TableContainer>
    </Container>
  );
}
