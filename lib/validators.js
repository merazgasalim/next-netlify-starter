import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export const SetNewPasswordSchema = Yup.object({
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
});
