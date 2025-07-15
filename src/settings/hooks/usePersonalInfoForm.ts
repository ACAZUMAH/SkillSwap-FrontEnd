import { useFormik } from "formik";
import * as yup from "yup";
import { usePhoneNumberValidaator } from "src/hooks";
import { User } from "src/interfaces";
import { useMemo } from "react";

const { title, message, validatePhoneNumber } = usePhoneNumberValidaator();

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .test(title, message, validatePhoneNumber)
    .required(""),
});

export const usePersonalInfoForm = (currentUser?: User) => {
  const initialValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
    }),
    [currentUser]
  );
  
  const form = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return { ...form };
};
