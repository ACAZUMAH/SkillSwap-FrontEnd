import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  receivedBy: yup.string().required("Received by is required"),
  skill: yup.string().required("Skill is required"),
  date: yup.date().required("Date is required").nullable(),
  time: yup.string().required("Time is required"),
});

export const useAddSessionForm = () => {
    const formik = useFormik({
        initialValues: {
            receivedBy: "",
            skill: "",
            date: new Date(),
            time: "",
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: () => {}
    })

    return { ...formik }
}