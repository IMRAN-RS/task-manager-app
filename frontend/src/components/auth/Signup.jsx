import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
      <p className="mt-4 text-center dark:text-gray-300">
        Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400">Login</Link>
      </p>
    </div>
  );
};

export default Signup;