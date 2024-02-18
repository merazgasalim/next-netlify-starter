import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Progress,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { countryList, minH } from "lib/constants";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { RiseLoader } from "react-spinners";

export default function Register() {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(100).required("Full name is required"),
      email: Yup.string().email().required("Email is required"),
      country: Yup.string().required("Country is required"),
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
            position: "top-right",
            variant: "left-accent",
          });
          // if ((process.env.NODE_ENV = "production"))
          await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          router.push("/");
        } else {
          toast({
            description: answer.reason,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
        }
      } catch (err) {
        toast({
          description: "Something went wrong, Please refresh and try again!",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
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
          {" "}
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
          <Button
            type="submit"
            colorScheme={"blue"}
            isLoading={loading}
            spinner={<RiseLoader size={8} color="white" />}
          >
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

