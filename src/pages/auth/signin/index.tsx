import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import loginImage from '@/assets/login.jpg';

export default function SignInPage() {
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
          <form className="space-y-4">
            <Input
              placeholder="Email address"
              type="email"
              className="w-full"
            />
            <Input placeholder="Password" type="password" className="w-full" />
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
