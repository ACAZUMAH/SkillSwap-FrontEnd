import { useFormik } from "formik";
import { useMemo } from "react";
import { User } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  institution: yup.string().optional(),
  degree: yup.string().optional(),
  fieldOfStudy: yup.string().optional(),
  level: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
});

export const useUpdateEducationForm = (user?: User) => {
 
  const initialValues = useMemo(
    () => ({
      institution: user?.education?.institution || "",
      degree: user?.education?.degree || "",
      fieldOfStudy: user?.education?.fieldOfStudy || "",
      level: user?.education?.level || "",
      startDate: new Date(user?.education?.startDate) || null,
      endDate: new Date(user?.education?.endDate) || null,
    }),
    [user]
  );

  const form = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  return { ...form };
};
