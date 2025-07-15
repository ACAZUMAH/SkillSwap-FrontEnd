import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    otp: yup
        .string().min(5)
        .required("Enter a valid OTP code")
})

export const usePasswodOtpForm = () => {
    const form = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema,
        onSubmit: () => { },
    });

    return { ...form };
}