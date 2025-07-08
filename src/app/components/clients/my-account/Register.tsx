import Link from 'next/link'
import React from 'react'

export const Register = () => {
    return (
        <div className=' text-white space-y-8 bg-black -mt-[17rem]'>
            <h2 className="mt-6 text-3xl font-semibold ml-[36rem] mx-5">
                Register
            </h2>
            <form className="mt-8 space-y-6 flex flex-col items-center" action="#" method="POST">
                <div className="rounded-md shadow-sm space-y-4">
                    <div className='flex flex-col  '>
                        <label htmlFor="username" className="block text-sm font-medium mx-5 text-gray-400 m-4">
                            Email Address<span className='text-red-500'>*</span>
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            className="appearance-none mx-5 relative block w-[48rem] px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        <p className='my-5 mx-5'>A link to set a new password will be sent to your email address.</p>
                        <p className='mb-10 max-w-[48rem] text-justify mx-5'>
                            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href='/privacy-policy' className='text-white hover:text-yellow-400'>privacy policy</Link>.
                        </p>
                        <button
              type="submit"
              className="group relative w-[15%] mx-5  mb-15 flex justify-center p-4 text-xl border border-transparent   font-semibold rounded-md text-[#55006F] bg-[#EFE554] hover:bg-[#55006F] hover:text-[#EFE554] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              REGISTER
            </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
