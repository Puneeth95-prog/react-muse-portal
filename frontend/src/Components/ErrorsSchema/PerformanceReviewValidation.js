import * as yup from "yup";

const PerformanceReviewSchema = yup.object().shape({
    reviewLoginEmail: yup.string().required("This field is required"),
    reviewLoginPassword: yup.string().required("This field is required"),
});

export default PerformanceReviewSchema;