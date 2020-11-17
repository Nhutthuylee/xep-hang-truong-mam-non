import React from 'react';
import '../../../styles/MultiStepForm.css';
import PageReview1 from './PageReview1';
import PageReview2 from './PageReview2';
import PageReview3 from './PageReview3';
import { useForm, useStep } from 'react-hooks-helper';
import Submit from './Submit';
const steps = [
    { id: "step1" },
    { id: "step2" },
    { id: "step3" },
    { id: "submit" }
];
const defaultData = {
    firstName: "Jane",
    tc2: '0',
    tc3: 0,
    tc4: 0,
    tc5: 0,
    tc6: 0,
    tc7: 0,
    tc8: 0,
    tc9: 0,
    tc10: 0,
    tc11: 0,
    tc12: 0,
    tc13: 0,
    tc14: 0,
    tc15: 0,
}
const MultiStepForm = () => {
    const [formData, setForm] = useForm(defaultData)
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    const props = {formData, setForm, navigation };
    switch (id) {
        case "step1":
            return <PageReview1 {...props} />
        case "step2":
            return <PageReview2 {...props} />
        case "step3":
            return <PageReview3 {...props} />
        case "submit":
            return <Submit {...props} />
        default:
            return null;
    }
};

export default MultiStepForm;