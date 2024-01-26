import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { minH } from "lib/constants";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";

export default function Register() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      rePassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      console.log(values);
      setLoading(true);
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const answer = await res.json();
        if (res.status === 200) {
          toast({
            description: answer.reason,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
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
    },
  });
  return (
    <>
      <NextSeo title="Register" description="Register" nofollow noindex />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        <VStack
          as={"form"}
          maxW={"md"}
          mx="auto"
          spacing={5}
          minH={minH}
          justify={"center"}
          onSubmit={formik.handleSubmit}
        >
          <FormControl
            isInvalid={formik.touched.email && formik.errors.email}
            isRequired
          >
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type={"email"}
              placeholder={"you@example.com"}
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
            isRequired
          >
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type={"password"}
              {...formik.getFieldProps("password")}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.rePassword && formik.errors.rePassword}
            isRequired
          >
            <FormLabel htmlFor="rePassword">Password</FormLabel>
            <Input
              id="rePassword"
              type={"password"}
              {...formik.getFieldProps("rePassword")}
            />
            <FormErrorMessage>{formik.errors.rePassword}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme={"blue"}>
            Register
          </Button>

          <Link as={NextLink} href="/auth/signIn" color="teal">
            Already have an account? Sign in
          </Link>
        </VStack>
      </Container>
    </>
  );
}
