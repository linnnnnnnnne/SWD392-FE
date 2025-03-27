import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import SignUpImage from '@/assets/signup.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      'https://furever-dmgrecfgevadawew.southeastasia-01.azurewebsites.net/api/user/create-user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          dob: formData.dob,
          password: formData.password
        })
      }
    );

    const data = await response.json();
    alert(data.message || 'Đăng ký thành công!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-3/4 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold">Đăng ký tài khoản!</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và Tên (*)"
                className="w-full rounded border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại (*)"
                className="w-full rounded border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email (*)"
                className="w-full rounded border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="dob"
                placeholder="Ngày sinh (yyyy/mm/dd)"
                className="w-full rounded border p-2"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password (*)"
                className="w-full rounded border p-2"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full rounded border p-2"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="w-1/2 rounded bg-pink-500 py-2 text-white"
              >
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
