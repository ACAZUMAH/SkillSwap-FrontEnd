import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  currentPassword: yup.string().min(8,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    ),
  newPassword: yup.string().min(8,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    )
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
      "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
    ),
  confirmNewPassword: yup.string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm new password is required"),
});

export const useChangePasswordForm = () => {
  const form = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: () => {},
  });

  return { ...form };
};
