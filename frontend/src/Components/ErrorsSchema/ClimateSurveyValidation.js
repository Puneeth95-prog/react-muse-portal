import * as yup from "yup";

const ClimateSurveyValidation = yup.object().shape({
    major_responsibilities: yup.string().required("*This field is required"),
    improvements: yup.string().required("*This field is required"),
    feedback: yup.string().required("*This field is required"),
    contributed_people: yup.string().required("*This field is required"),
    commendations: yup.string().required("*This field is required"),
    actions_to_improve: yup.string().required("*This field is required"),
    next_year_goals: yup.string().required("*This field is required"),
});

export default ClimateSurveyValidation;