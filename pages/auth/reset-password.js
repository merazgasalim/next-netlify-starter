import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Progress,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { minH } from "lib/constants";
import { NextSeo } from "next-seo";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { ResetPasswordSchema, SetNewPasswordSchema } from "lib/validators";
import { RiseLoader } from "react-spinners";

export default function ResetPassword() {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/register?email=${values.email}`);
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
      <NextSeo
        title="Reset Password"
        description="Reset Password"
        nofollow
        noindex
      />
      <Container as={"main"} maxW="6xl" pt={20} minH={minH}>
        {!router.query.email ? (
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

            <Button
              type="submit"
              colorScheme={"blue"}
              isLoading={loading}
              spinner={<RiseLoader size={8} color="white" />}
            >
              Reset Password
            </Button>
          </VStack>
        ) : (
          <SetNewPassword />
        )}
      </Container>
    </>
  );
}

const SetNewPassword = () => {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      rePassword: "",
    },
    validationSchema: SetNewPasswordSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/auth/register`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            email: router.query.email,
            token: router.query.token,
          }),
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

          const res = await signIn("credentials", {
            email: router.query.email,
            password: values.rePassword,
            redirect: false,
          });
          console.log(res)
          router.push(res.url)
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
          Reset Password
        </Button>
      </VStack>
    </>
  );
};

