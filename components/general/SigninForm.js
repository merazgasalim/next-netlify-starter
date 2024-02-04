import {
  Button,
  HStack,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Link,
} from "@chakra-ui/react";
import * as Yup from "yup";

import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SigninForm({ registerFn }) {
  const router = useRouter();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const formikSignin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinFormValidation,
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (!res.ok) {
          toast({
            description: res.error,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
        } else {
          toast({
            description: "Sign in successful!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
            variant: "left-accent",
          });
        }
      } catch (err) {
        toast({
          description: "Something went wrong! Please contact us.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
          variant: "left-accent",
        });
      } finally {
        setLoader(false);
      }
      //alert(JSON.stringify(values, null, 2));
      //handelUpdateProfile(values);
    },
  });
  return (
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
        isInvalid={formikSignin.touched.email && formikSignin.errors.email}
        isRequired
      >
        <FormLabel htmlFor="signin-email">Email</FormLabel>
        <Input
          id="signin-email"
          type={"email"}
          placeholder={"you@example.com"}
          {...formikSignin.getFieldProps("email")}
        />
        <FormErrorMessage>{formikSignin.errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={
          formikSignin.touched.password && formikSignin.errors.password
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
        <FormErrorMessage>{formikSignin.errors.password}</FormErrorMessage>
      </FormControl>

      <HStack justify={"space-between"} w="full">
        <Button colorScheme={"blue"} type="submit" isLoading={loader}>
          Sign in
        </Button>
        <VStack>
          <Link onClick={() => registerFn(0)} color="teal">
            Not registered? Register.
          </Link>
          <Link
            onClick={() => router.push("/auth/reset-password")}
            color="teal"
          >
            Forgot password? Reset.
          </Link>
        </VStack>
      </HStack>
    </VStack>
  );
}

const signinFormValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
