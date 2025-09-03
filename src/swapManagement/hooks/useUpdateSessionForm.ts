import { useFormik } from "formik";
import { useMemo } from "react";
import { Session } from "src/interfaces";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  receivedBy: yup.string().required("Received by is required"),
  skill: yup.string().required("Skill is required"),
  date: yup.date().required("Date is required").nullable(),
  time: yup.string().required("Time is required"),
});

export const useUpdateSessionForm = (currentSession: Session) => {
    const initialValues= useMemo(() => ({
        receivedBy: currentSession.receivedBy || "",
        skill: currentSession.skill || "",
        date: currentSession.date || new Date(),
        time: currentSession.time || "",
    }), [currentSession])
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: () => {}
    })

    return { ...formik }
}