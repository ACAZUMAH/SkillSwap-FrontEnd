import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .matches(/^\d{5}$/, "OTP must be a 5-digit number"),
})

export const useVerifyOtpForm = () => {
    const form = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: () => { },
    });

    return { ...form };
}