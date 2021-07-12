import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthError } from '../../actions/authActions';
const Login = (props) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, autherror } = auth;
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (autherror === 'Invalid Credentials') {
      dispatch(clearAuthError());
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history, autherror]);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-warning'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-warning btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
