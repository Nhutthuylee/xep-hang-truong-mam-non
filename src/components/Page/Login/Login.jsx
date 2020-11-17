import React from 'react';
import './Login.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../actions/authActions';

const Login = (props) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { email, password } = inputs;
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'WELCOME TO DNKID';

    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (email && password) {
            dispatch(login(email, password));
        }
    }
    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }
    // const handleEmailValueChange = event => setEmail(event.target.value);
    // const handlePassWordValueChange = event => setPassword(event.target.value);
    return (
        <div className="login_space">
            <div className="login_page">
                <div className="form">
                    <div className="ad_logo">
                        <h2 className="font-italic">DNKID</h2>
                    </div>
                    <form className="login_form" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="Email">Email:</label>
                            <input type="email"
                                id="Email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                required
                                onChange={handleChange}
                                name="email" value={email} className={'form-control' + (submitted && !email ? ' is-invalid' : '')}
                            />
                            {submitted && !email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password"
                                name="password"
                                placeholder="password"
                                required
                                onChange={handleChange}
                                value={password} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                            {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            }
                        </div>

                        <div className="message">

                            <p className="text-center text-danger"></p>
                        </div>
                        <button type="submit">login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;