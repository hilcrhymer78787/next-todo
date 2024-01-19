import Login from '@/components/AuthLayout/Login'
import React from 'react'
const Auth = () => {
    const [isNew, setIsNew] = React.useState(false)
    if (isNew) return <div>新しいユーザーを作成</div>
    return <Login setIsNew={setIsNew} />
}
export default Auth