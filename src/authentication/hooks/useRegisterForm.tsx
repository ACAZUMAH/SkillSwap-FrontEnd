import { useFormik } from "formik";
import * as yup from "yup";
import { usePhoneNumberValidaator } from "src/hooks";

const { title, message, validatePhoneNumber } = usePhoneNumberValidaator();

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .test(title, message, validatePhoneNumber)
    .required(""),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export const useRegisterForm = () => {
  const form = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return { ...form };
};
