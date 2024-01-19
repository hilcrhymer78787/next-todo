import Login from '@/components/AuthLayout/Login'
import NewUser from '@/components/AuthLayout/NewUser'
import React from 'react'
const Auth = () => {
    const [isNew, setIsNew] = React.useState(false)
    if (isNew) return <NewUser setIsNew={setIsNew} />
    return <Login setIsNew={setIsNew} />
}
export default Auth