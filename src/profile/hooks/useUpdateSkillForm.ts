import { useFormik } from "formik";
import { User } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  skillsProficientAt: yup.array().of(yup.string()).nullable(),
  skillsToLearn: yup.array().of(yup.string()).nullable(),
});

export const useUpdateSkillForm = (currentUser?: User) => {
  const form = useFormik({
    initialValues: {
      skillsProficientAt: currentUser?.skillsProficientAt || [],
      skillsToLearn: currentUser?.skillsToLearn || [],
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return { ...form };
};
