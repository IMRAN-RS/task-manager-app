import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Login</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">Login</Button>
      </form>
      <p className="mt-4 text-center dark:text-gray-300">
        Don't have an account? <Link to="/signup" className="text-blue-600 dark:text-blue-400">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;