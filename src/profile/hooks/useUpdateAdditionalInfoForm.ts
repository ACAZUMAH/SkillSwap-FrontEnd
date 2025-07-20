import { useFormik } from "formik";
import { User } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  bio: yup.string().optional(),
  portfolio: yup.string().url("Invalid URL format").nullable(),
  gitHub: yup.string().url("Invalid URL format").nullable(),
  linkedIn: yup.string().url("Invalid URL format").nullable(),
});

export const useUpdateAdditionalInfoForm = (user?: User) => {

  const form = useFormik({
    initialValues: {
      bio: user?.bio || "",
      gitHub: user?.gitHub || "",
      linkedIn: user?.linkedIn || "",
      portfolio: user?.portfolio || ""
    },
    validationSchema,
    onSubmit: () => {},
  });

  return { ...form };
};
