import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)

        if (json.success) {
            // Redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            alert("Logged in SuccessFully")
            window.location.reload()
        } else {
            alert("invalid credential")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    return (
        <>
            <section className="bg-black">
                <div className="flex flex-col items-center justify-center px-6 mx-auto mt-20">
                    <Link to="/login" className="flex items-center pb-5">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-500 underline underline-offset-4">Login</span>
                    </Link>
                    <div className="w-full rounded-lg shadow sm:max-w-md ring ring-gray-600">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Login to your account
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                                    <input type="email" name="email" id="email" value={credentials.email} onChange={onChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                    <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
                                </div>
                                <button type="submit"
                                    className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600">
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-white">
                                    Don't have an account yet?
                                    <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                                        <br />
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
