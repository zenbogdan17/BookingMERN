import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { setUser, user } = useContext(UserContext);

  if (user) return <Navigate to="/" />;

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields of the form must be filled out!');
    }

    try {
      const response = await axios.post('/login', { email, password });

      setUser(response.data);
      toast.success('Success login!');
      setRedirect(true);
    } catch (error) {
      console.error('Error making request:', error);
      toast.error('Something went wrong!');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-24">
        <h1 className="text-4xl text-center mb-2">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handlerSubmit}>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(even) => setEmail(even.target.value)}
          ></input>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(even) => setPassword(even.target.value)}
          ></input>

          <button className="primary" type="submit">
            Login
          </button>

          <div className="text-center py-2">
            Don't have an account yet?{' '}
            <Link className=" underline font-bold" to={'/register'}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
