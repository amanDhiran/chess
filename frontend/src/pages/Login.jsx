import React from 'react'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000'

function Login() {
    
    const google = () => {
        window.open(`${BACKEND_URL}/auth/google`, '_self');
    };
    
  return (
    <div className='p-3 bg-slate-400' onClick={google}>Login with google</div>
  )
}

export default Login