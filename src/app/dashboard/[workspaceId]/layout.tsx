import { onAuthenticateUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: { workspaceId: string }
    children: React.ReactNode
}

const Layout = async ({ params: { workspaceId }, children }: Props) => {
    const auth = await onAuthenticateUser()
    if (!auth.user?.workspace) redirect('/auth/sign-in')
    if (!auth.user?.workspace?.length) redirect('/auth/sign-in')
    return (
        <div>Layout</div>
    )
}

export default Layout 