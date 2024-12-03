import * as yup from "yup";

const AppraisalRatingSchema = yup.object().shape({
    appraisal_rating_1: yup.string().required("*This field is required"),
    appraisal_rating_2: yup.string().required("*This field is required"),
    appraisal_rating_3: yup.string().required("*This field is required"),
    appraisal_rating_4: yup.string().required("*This field is required"),
    appraisal_rating_5: yup.string().required("*This field is required"),
    appraisal_rating_6: yup.string().required("*This field is required"),
    appraisal_rating_footer: yup.string().required("*This field is required"),
});

export default AppraisalRatingSchema;

