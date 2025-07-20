
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useFormik } from "formik";
import { User } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

const validateProfileImage = yup.object().shape({
  profile_img: yup
    .mixed()
    .test("fileTyps", "Invalid file type", (value: any) => {
      return [...IMAGE_MIME_TYPE].includes(value?.type);
    }),
});

export const useProfileImageform = () => {
  const form = useFormik({
    initialValues: {
      profileImg: "",
    },
    validateOnMount: true,
    validationSchema: validateProfileImage,
    onSubmit: () => {},
  });

  const handleFileChange = (file: File) => {
    form.setFieldValue("profileImg", file);
  };

  return { ...form, handleFileChange };
};


export const useUpdatePersonalInfoForm = (user?: User) => {
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      profile_img: user?.profile_img || "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  return { ...formik };
};