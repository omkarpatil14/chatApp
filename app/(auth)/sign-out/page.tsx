import React from 'react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const page =async () => {
  const supabase =await createClient()
  const { error } = await supabase.auth.signOut()
  if(!error)    redirect('/sign-in')

  return (
    <div>
      Signing out....
    </div>
  )
}

export default page
