import React from 'react'
import Login from '@/app/components/clients/my-account/login'
import {Register} from '@/app/components/clients/my-account/Register'
export default function MyAccountPage() {
  return (
    <div>
        {/* <p className='text-3xl font-semibold text-white text-center mt-6'>My Account</p> */}
        <Login />
        <Register />
    </div>
  )
}
