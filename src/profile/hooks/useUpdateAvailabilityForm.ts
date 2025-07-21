import { useFormik } from "formik";
import { User } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  availability: yup.array().of(yup.string()).nullable(),
});

export const useUpdateAvailabilityForm = (user?: User) => {
  const form = useFormik({
    initialValues: {
      availability: user?.availability || [],
    },
    validationSchema,
    onSubmit: () => {},
  });

  const addAvailability = (newAvailability: string) => {
    form.setFieldValue("availability", [
      ...form.values.availability,
      newAvailability,
    ]);
  };

  const removeAvailability = (availabilityToRemove: string) => {
    form.setFieldValue(
      "availability",
      form.values.availability.filter((item) => item !== availabilityToRemove)
    );
  };

  return { ...form, addAvailability, removeAvailability };
};
