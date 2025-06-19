import { useFormik } from "formik";
import { User } from "src/interfaces";
import * as yup from "yup";
import { usePhoneNumberValidaator } from "src/hooks";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMemo } from "react";
const { title, message, validatePhoneNumber } = usePhoneNumberValidaator();

const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .test(title, message, validatePhoneNumber)
    .required("Phone number is required"),
  bio: yup.string().max(500, "Bio must be at most 500 characters long"),
  profile_img: yup.string().url("Invalid URL format").nullable(),
  portfolio: yup.string().url("Invalid URL format").nullable(),
  gitHub: yup.string().url("Invalid URL format").nullable(),
  linkedIn: yup.string().url("Invalid URL format").nullable(),
  institution: yup.string().required("Institution is required"),
  fieldOfStudy: yup.string().required("Field of study is required"),
  level: yup.string().required("Level is required"),
  degree: yup.string().required("Degree is required"),
  endDate: yup.date().optional(),
  skillsProficientAt: yup.array().of(yup.string()).nullable(),
  skillsToLearn: yup.array().of(yup.string()).nullable(),
  availability: yup.array().of(yup.string()).nullable(),
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
      profile_img: "",
    },
    validateOnMount: true,
    validationSchema: validateProfileImage,
    onSubmit: () => {},
  });

  const handleFileChange = (file: File) => {
    form.setFieldValue("profile_img", file);
  };

  return { ...form, handleFileChange };
};

export const useUpdateProfileForm = (currentUser?: User) => {
  const initialValues = useMemo(
    () => ({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      phoneNumber: currentUser?.phoneNumber || "",
      bio: currentUser?.bio || "",
      profile_img: currentUser?.profile_img || "",
      portfolio: currentUser?.portfolio || "",
      gitHub: currentUser?.gitHub || "",
      linkedIn: currentUser?.linkedIn || "",
      institution: currentUser?.education?.institution || "",
      fieldOfStudy: currentUser?.education?.fieldOfStudy || "",
      level: currentUser?.education?.level || "",
      degree: currentUser?.education?.degree || "",
      endDate:
        currentUser?.education?.endDate || (undefined as Date | undefined),
      skillsProficientAt: currentUser?.skillsProficientAt
        ? [...currentUser.skillsProficientAt]
        : [],
      skillsToLearn: currentUser?.skillsToLearn
        ? [...currentUser.skillsToLearn]
        : [],
      availability: currentUser?.availability || [],
    }),
    [currentUser]
  );

  const form = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    },
  });

  return { ...form };
};
