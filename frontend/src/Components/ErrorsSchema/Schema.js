import * as yup from "yup";

const Schema = yup.object().shape({
    itEmail: yup.string().required("This field is required"),
    itPassword: yup.string().required("This field is required"),
});

export default Schema;