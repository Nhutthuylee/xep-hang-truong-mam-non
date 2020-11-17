import React from "react";
import { Field } from "formik";
import TextField from "@material-ui/core/TextField";
import Star from './Star';
import ReactStars from "react-rating-stars-component";

const FormFirstStep = formikProps => {
    const { errors, touched } = formikProps;
    const Fieldname = "star";
    return (
        <>
            <Field
                name="firstName"
                label="First Name *"
                as={TextField}
                error={touched.firstName && errors.firstName}
                helperText={touched.firstName && errors.firstName}
            />

            <Field name="middleName" label="Middle Name" as={TextField} />

            <Field
                name="lastName"
                label="Last Name *"
                as={TextField}
                error={touched.lastName && errors.lastName}
                helperText={touched.lastName && errors.lastName}

            />
            <Field name={Fieldname} id={Fieldname} type="number">
                {({ field: { value }, form: { setFieldValue } }) => (
                    <div>
                        <label htmlFor={Fieldname} className={"label-color"}>
                            {Fieldname}
                        </label>
                        <div>
                            <ReactStars
                                count={5}
                                value={value}
                                name="rating"
                                handleClick={number => setFieldValue(Fieldname, number)}
                                size={40}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                )}
            </Field>
        </>
    );
};
export default FormFirstStep;