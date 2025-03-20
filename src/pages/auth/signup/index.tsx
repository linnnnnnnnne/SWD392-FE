import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import SignUpImage from '@/assets/signup.jpg';

const SignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-3/4 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold">Đăng ký tài khoản!</h2>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và Tên (*)"
                className="w-full rounded border p-2"
              />
              <input
                type="text"
                placeholder="Số điện thoại (*)"
                className="w-full rounded border p-2"
              />
              <input
                type="email"
                placeholder="Email (*)"
                className="w-full rounded border p-2"
              />
              <input
                type="date"
                placeholder="Ngày sinh (yyyy/mm/dd)"
                className="w-full rounded border p-2"
              />
              <input
                type="password"
                placeholder="Password (*)"
                className="w-full rounded border p-2"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full rounded border p-2"
              />
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <label className="mt-2 flex items-center">
                <input type="checkbox" className="mr-2" /> I agree to all the{' '}
                <a href="#" className="text-blue-500">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500">
                  Privacy policy
                </a>
              </label>
            </div>
            <div className="mt-6 flex space-x-4">
              <button className="w-1/2 rounded bg-pink-500 py-2 text-white">
                Create account
              </button>
              <button className="flex items-center rounded bg-black px-4 py-2 text-white">
                <FcGoogle className="mr-2" size={20} />
                Sign-in with Google
              </button>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="bg-yellow-100 relative flex w-1/2 items-center justify-center">
          <img
            src={SignUpImage}
            alt="Pet Shop SignUp"
            className="w-4/5 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
