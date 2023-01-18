import React, { useRef, useState } from 'react';
import { login } from '../../api/apiAuth';
import Layout from '../Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { authenticate, userInfo } from '../../utils/auth';

const Login = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const submitBtn = useRef(null);

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        setDisabled(true);

        submitBtn.current.textContent = '';
        submitBtn.current.classList.add('loading');

        login({email: value.email, password: value.password})
            .then(response => {
                authenticate(response.data.token, () => {
                    setValue({
                        name: '',
                        email: '',
                        password: ''
                    });
                    setDisabled(false);
                    setError(false);
                    setRedirect(true);
    
                    submitBtn.current.textContent = 'Login';
                    submitBtn.current.classList.remove('loading');
                });
            })
            .catch(err => {
                if (err.response) {
                    setDisabled(false);
                    setError(err.response.data);

                    submitBtn.current.textContent = 'Login';
                    submitBtn.current.classList.remove('loading');

                    if (err.response.data.loginErr) {
                        toast.error(`${err.response.data.loginErr}`, {
                            autoClose: 3000
                        });
                    }
                } else {
                    if (navigator.onLine) {
                        setDisabled(false);
                        setError(false);

                        submitBtn.current.textContent = 'Login';
                        submitBtn.current.classList.remove('loading');

                        toast.error(`Login failed! Please try again.`, {
                            autoClose: 3000
                        });
                    } else {
                        setDisabled(false);
                        setError(false);

                        submitBtn.current.textContent = 'Login';
                        submitBtn.current.classList.remove('loading');

                        toast.error(`Internet connection failed!`, {
                            autoClose: 3000
                        });
                    }
                }
            });
    }

    const redirectUser = () => {
        if (redirect) {
            return <Navigate to={`/${userInfo().role}/dashboard`} />
        }
    }

    return (
        <Layout title='Login' classname='container'>
            {redirectUser()}
            <ToastContainer />
            <div className="row">
                <div className="col-lg-7 col-mg-10 m-auto">
                    <form className='authForm' onSubmit={handleSubmit}>
                        <h1 className='text-center'>Login Here</h1>
                        <div className="mb-3">
                            <label className="form-label">Email Address: </label>
                            <input type="text" className="form-control" name='email' value={value.email} onChange={handleChange} />
                            <div className="text-danger">{error.message ? error.message : ''}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password: </label>
                            <input type="password" className="form-control" name='password' value={value.password} onChange={handleChange} />
                        </div>
                        <button type="submit" disabled={disabled} className="submitBtn" ref={submitBtn}>Submit</button>
                        </form>
                    </div>
            </div>
        </Layout>
    );
};

export default Login;