import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  skill: yup.string().required("Skill is required"),
  taughtBy: yup.string().required("Taught by is required"),
  dayOfweek: yup.string().required("Day of week is required"),
  time: yup.string().required("Time is required"),
  durationInWeeks: yup
    .number()
    .min(1, "Duration must be at least 1 week")
    .required("Duration is required"),
  startDate: yup.date().required("Start date is required").nullable(),
});

export const useAddTimeTableForm = () => {
  const form = useFormik({
    initialValues: {
      skill: "",
      taughtBy: "",
      dayOfweek: "",
      time: "",
      durationInWeeks: 1,
      startDate: new Date(),
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  return { ...form };
};
