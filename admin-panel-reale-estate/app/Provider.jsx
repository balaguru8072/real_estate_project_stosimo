"use client"

import React, { use } from 'react'
import AdminLayout from './_component/_headers/AdminLayout'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'

function Provider({ children }) {
    const pathname = usePathname()
    const router = useRouter()

    if (pathname === '/login') {
        return <>{children}</>
    }

    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/login')
        router.refresh()
    }
    return (
        <div>
            <div className=''>
            <AdminLayout onLogout={handleLogout}>
                {children}
            </AdminLayout>
            </div>
        </div >
    )
}

export default Provider