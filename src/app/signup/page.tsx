import SignUpForm from '@/components/auth/signup'
import NavigationBar from '@/components/navigation/NavigationBar'
import { GridProvider } from '@/components/providers/grid-provider'
import { rpc } from '@/lib/rpc'
import { setCookies } from '@/utils/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const {data: user, error: unauthorized} = await rpc.api.user.current.get(setCookies())

  return (
    <div>
      <NavigationBar/>
      <SignUpForm/>
    </div>
  )
}

export default page