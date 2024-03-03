import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('All fields of the form must be filled out!');
    }

    try {
      const response = await axios.post('/register', { name, email, password });

      setUser(response.data);
      toast.success('Success register!');
      console.log(response);
    } catch (error) {
      console.error('Error making request:', error);

      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-24">
        <h1 className="text-4xl text-center mb-2">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>

          <button className="primary" type="submit">
            Register
          </button>

          <div className="text-center py-2">
            If you already have an account?{' '}
            <Link className="font-bold underline" to={'/login'}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
