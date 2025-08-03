import { useFormik } from "formik";
import * as yup from "yup";
import { usePhoneNumberValidaator } from "src/hooks";

const { title, message, validatePhoneNumber } = usePhoneNumberValidaator();

const validationSchema = yup.object().shape({
  accountNumber: yup
    .string()
    .test(title, message, validatePhoneNumber)
    .required(""),

  newPassword: yup
    .string()
    .min(
      8,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    )
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    ),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required(""),
});

export const useResetPasswordForm = () => {
  const form = useFormik({
    initialValues: {
      accountNumber: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return { ...form };
};
