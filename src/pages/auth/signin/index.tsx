import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import loginImage from '@/assets/login.jpg';

export default function SignInPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch(
        'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginData)
        }
      );

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();

      if (data.isSuccess && data.data.userID) {
        localStorage.setItem('userId', data.data.userID);

        navigate('/');
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (error) {
      setError('Invalid email or password.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-1/2 items-center justify-center">
        <Card className="w-96 bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Welcome back!
          </h2>
          <p className="mb-6 text-gray-500">
            Nhập thông tin xác thực của bạn để truy cập account của bạn
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email address"
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember for 30 days
              </label>
              <a href="#" className="text-sm text-blue-500">
                Forgot password?
              </a>
            </div>
            <Button className="w-full bg-pink-500 text-white hover:bg-pink-600">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-gray-500">Or</div>
          <div className="mt-4 flex gap-2">
            <Button className="flex w-1/2 items-center justify-center gap-2 border bg-white text-gray-800">
              <FcGoogle /> Sign in with Google
            </Button>
            <Button className="flex w-1/2 items-center justify-center gap-2 border bg-white text-gray-800">
              <FaApple /> Sign in with Apple
            </Button>
          </div>
          <div className="mt-4 text-center">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </div>
        </Card>
      </div>
      <div className="relative flex w-1/2 items-center justify-center bg-gray-200">
        <img
          src={loginImage}
          alt="Pet Shop Login"
          className="w-4/5 object-cover"
        />
      </div>
    </div>
  );
}
