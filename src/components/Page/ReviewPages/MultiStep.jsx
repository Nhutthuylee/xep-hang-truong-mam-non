import React, { useState } from "react";
import { Formik, Form } from "formik";
import FormFirstStep from "./FormFisrtStep";
import { FormSecondStep } from "./FormSecondStep";
import { FormSuccess } from "./FormSuccess";
import { StepButton } from "./StepButton";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // maxWidth: "500px"
    }
}));

const renderStep = (step, values, errors, touched) => {
    switch (step) {
        case 1:
            return <FormFirstStep errors={errors} touched={touched} />;
        case 2:
            return <FormSecondStep errors={errors} touched={touched} />;
        case 3:
            return <FormSuccess values={values} />;
        default:
            return <FormFirstStep errors={errors} touched={touched} />;
    }
};

const MultiStep = () => {
    const [step, setStep] = useState(1);
    const classes = useStyles();
    const formData = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        city: "",
        state: "",
        country: "",
        rating: 0
    };
    // const handleSubmit = () => setStep(step => step + 1);

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = "Required";
        }

        if (!values.lastName) {
            errors.lastName = "Required";
        }

        return errors;
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{ ...formData }}
                onSubmit={(values, { setErrors, setSubmitting, resetForm }) => {
                    //let star = {tc};
                    let postData = { ...values }
                    console.log(postData)
                }}
                validate={validate}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form className={classes.form}>
                        {renderStep(step, values, errors, touched)}
                        <StepButton step={step} />
                    </Form>
                )}
            </Formik>
        </>
    );
};
export default MultiStep;