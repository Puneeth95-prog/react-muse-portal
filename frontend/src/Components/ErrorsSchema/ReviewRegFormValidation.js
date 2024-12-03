import * as yup from "yup";

const ReviewRegFormValidation = yup.object().shape({
    reviewRegisterEmail: yup.string().required("This field is required"),
    reviewRegisterPassword: yup.string().required("This field is required"),
    confirmPassword: yup.string().oneOf([yup.ref('reviewRegisterPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default ReviewRegFormValidation;