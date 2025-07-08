import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="w-[50rem] space-y-8 bg-black p-8 ">
        <p className='text-5xl font-semibold text-white text-center'>My Account</p>
        <div>
          <h2 className="mt-6 text-3xl font-semibold text-">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm -ml-1 font-medium text-gray-400 m-4">
                Username or Email <span className='text-red-500'>*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm -ml-1"
             
              />    
            </div>
            <div>
              <label htmlFor="password" className="block text-sm -ml-1 font-medium text-gray-400 m-4">
                Password <span className='text-red-500'>*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none bg-white focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 
              />
            </div>
          </div>

          <div className="flex items-center  gap-4">
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center p-4 text-xl border border-transparent   font-semibold rounded-md text-[#55006F] bg-[#EFE554] hover:bg-[#55006F] hover:text-[#EFE554] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              LOG IN
            </button>
          </div>
            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Remember me
              </label>
            </div>

            
          </div>

          <div className="text-sm mb-15">
              <Link href="/forgot-password" className="font-medium -ml-1 text-white hover:text-[#EFE554] hover:underline transition-colors">
                Forgot your password?
              </Link>
            </div>
        </form>
      </div>
    </div>
  );
}
