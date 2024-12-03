import * as yup from "yup";

const ComplaintSchema = yup.object().shape({
    complaintDescription: yup.string().required("This field is required"),
});

export default ComplaintSchema;