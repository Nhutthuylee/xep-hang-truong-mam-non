import React from "react";
import history from '../../../history';
const Submit = ({ setForm, formData, navigation }) => {
    const{
        firstName,
        tc2,
        // tc3,
        // tc4,
        // tc5,
        // tc6,
        // tc7,
        // tc8,
        // tc9,
        // tc10,
        // tc11,
        // tc12,
        // tc13,
        // tc14,
        // tc15,
    }= formData;
    // const { go } = navigation;
    return (
        <div>
            <p>{firstName}</p>
            <p>{tc2}</p>
            <h3>Thank you for submitting. We will be in touch</h3>
            <p>New Form this</p><button onClick={() => { history.push("/home") }}>New</button>
        </div>
    );
};

export default Submit;