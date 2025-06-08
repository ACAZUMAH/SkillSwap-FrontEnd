import { useFormik } from "formik";
import * as yup from "yup";
import { usePhoneNumberValidaator } from "src/hooks";

const { title, message, validatePhoneNumber } = usePhoneNumberValidaator();

const validationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .test(title, message, validatePhoneNumber)
        .required(""),
    password: yup
        .string()
        .required("")
        .min(
            8,
            "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
        )
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
            "Password must be at least 8 characters long, include (A-Z), (a-z), (1-9), and a special character"
        ),
});

export const useLoginForm = () => {
    const form = useFormik({
        initialValues: {
            phoneNumber: "",
            password: ""
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: () => { }
    });

    return { ...form }
}