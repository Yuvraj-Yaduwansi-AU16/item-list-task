import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/authActions';

const Register = (props) => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, autherror } = auth;

  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const { name, email, password, role } = user;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (autherror === 'User already exists') {
      dispatch(clearAuthError());
    }
    // eslint-disable-next-line
  }, [autherror, props.history, isAuthenticated]);
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name,
        email,
        password,
        role,
      })
    );
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-warning'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Role</label>
          <input
            className='mx-3'
            type='radio'
            name='role'
            value='user'
            checked={role === 'user'}
            onChange={onChange}
          />
          User{' '}
          <input
            className='mx-3'
            type='radio'
            name='role'
            value='admin'
            checked={role === 'admin'}
            onChange={onChange}
          />
          Admin
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-warning btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
